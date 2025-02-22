const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  managerId: { type: String, unique: true },   
  name: { type: String, required: true },             
  phone_Number: { type: String, required: true, unique: true }, 
  username: { type: String, unique: true, required: true}, 
  password: { type: String, required: true }, 
  email: { type: String, unique: true, required: true},
  department: {type: String, required: true, unique: true},
  roles: {type: Array, required: true, default: ['manager']},
  avgResolutionTime: { type: Number, default: 0},
  avgResponseTime: { type: Number, default: 0}
}, {timestamps: true}); 

managerSchema.pre('save', function(next) {
  if (!this.managerId) {
    this.managerId = this.username.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// Export the schema as a model
const Manager = mongoose.model("manager", managerSchema, "manager");

module.exports = Manager;