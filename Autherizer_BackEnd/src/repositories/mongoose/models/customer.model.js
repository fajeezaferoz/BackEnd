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
    location: { type: String, required: true }, // City, State, Country, etc.
    latitude: { type: Number }, // Store the latitude
    longitude: { type: Number }, // Store the longitude
  },
  { timestamps: true }
);

// Function to fetch latitude & longitude from location using OpenStreetMap
async function getLatLong(location) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
    );

    if (response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
      };
    } else {
      throw new Error('Location not found.');
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

  if (this.isModified('location') || this.latitude === undefined || this.longitude === undefined) {
    const { latitude, longitude } = await getLatLong(this.location);
    this.latitude = latitude;
    this.longitude = longitude;
  }

  next();
});

// Export the schema as a model
const Customer = mongoose.model('customer', customerSchema, 'customer');

module.exports = Customer;
