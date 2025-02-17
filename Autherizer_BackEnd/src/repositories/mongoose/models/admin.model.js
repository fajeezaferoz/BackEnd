const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Admin_ID: { type: String, unique: true },   
  name: { type: String, required: true },              
  phone_Number: { type: String, required: true, unique: true }, 
  username: { type: String, unique: true, required: true}, 
  password: { type: String, required: true }, 
  email: { type: String, unique: true, required: true},
  department: { type: String, required: true},
  roles: {type: Array, required: true, default: ['admin']}
}, {timestamps: true}); 

adminSchema.pre('save', function(next) {
  if (!this.Admin_ID) {
    // Generate Admin_ID from username (lowercase and joined with '-')
    this.Admin_ID = this.username.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Export the schema as a model
const Admin = mongoose.model("admin", adminSchema, "admin");

module.exports = Admin;
