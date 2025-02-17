const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerID: { type: String, unique: true },   
  name: { type: String, required: true },             
  phone_Number: { type: String, required: true, unique: true }, 
  username: { type: String, unique: true, required: true}, 
  password: { type: String, required: true }, 
  email: { type: String, unique: true, required: true},
  roles: {type: Array, required: true, default: ['customer']} 
}, {timestamps: true}); 

customerSchema.pre('save', function(next) {
  if (!this.customerID) {
    this.customerID = this.username.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Export the schema as a model
const Customer = mongoose.model("customer", customerSchema, "customer");

module.exports = Customer;