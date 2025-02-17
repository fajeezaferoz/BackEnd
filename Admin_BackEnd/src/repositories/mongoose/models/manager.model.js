const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  Manager_ID: { type: String, unique: true },   
  name: { type: String, required: true },             
  phone_Number: { type: String, required: true, unique: true }, 
  username: { type: String, unique: true, required: true}, 
  password: { type: String, required: true }, 
  email: { type: String, unique: true, required: true},
  domain: {type: String, required: true, unique: true}
}, {timestamps: true}); 

managerSchema.pre('save', function(next) {
  if (!this.Manager_ID) {
    this.Manager_ID = this.username.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Export the schema as a model
const Manager = mongoose.model("manager", managerSchema, "manager");

module.exports = Manager;