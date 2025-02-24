const mongoose = require('mongoose');
const axios = require('axios');

const customerSchema = new mongoose.Schema(
  {
    customerID: { type: String, unique: true },
    name: { type: String, required: true },
    phone_Number: { type: String, required: true, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    roles: { type: Array, required: true, default: ['customer'] },
    pincode: { type: String, required: true }, // Now using pincode instead of location
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true }
);

// Function to fetch latitude & longitude from pincode using OpenStreetMap
async function getLatLong(pincode) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(pincode)}&format=json&limit=1`
    );

    if (response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
      };
    } else {
      throw new Error('Pincode not found.');
    }
  } catch (error) {
    console.error('Geocoding Error:', error.message);
    return { latitude: null, longitude: null };
  }
}

// Pre-save middleware to fetch latitude & longitude before saving
customerSchema.pre('save', async function (next) {
  if (!this.customerID) {
    this.customerID = this.username.toLowerCase().replace(/\s+/g, '-');
  }

  // If the pincode was modified or lat/long are not set, update them.
  if (this.isModified('pincode') || this.latitude === undefined || this.longitude === undefined) {
    const { latitude, longitude } = await getLatLong(this.pincode);
    this.latitude = latitude;
    this.longitude = longitude;
  }

  next();
});

// Export the schema as a model
const Customer = mongoose.model('customer', customerSchema, 'customer');

module.exports = Customer;
