const mongoose = require('mongoose');
const manager = require('./manager.model');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: { type: String, required: true, maxlength: 50 },
  managerId: { type: String, required: true, ref: manager},
  designation: { type: String, required: true, maxlength: 50 },
  department: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  phoneNo: { type: String, required: true, unique: true, maxlength: 15 },
  password: { type: String, required: true, maxlength: 100 }
}, { 
  timestamps: true // Adds createdAt and updatedAt
});

// Pre-save middleware to generate employeeId from name
employeeSchema.pre('save', function (next) {
  if (!this.employeeId) {
    this.employeeId = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

const Employee = mongoose.model('employee', employeeSchema, 'employee');

module.exports = Employee;
