const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  EMPLOYEE_ID: { type: String, required: true, unique: true, autoIncrement: true },
  EMPLOYEE_FIRSTNAME: { type: String, required: true, maxlength: 50 },
  EMPLOYEE_LASTNAME: { type: String, required: true, maxlength: 50 },
  EMPLOYEE_MANAGERID: {type: String, required: true},
  EMPLOYEE_DESIGNATION: { type: String, required: true, maxlength: 50 },
  EMPLOYEE_DEPARTMENT: { type: String, required: true, maxlength: 50 },
  EMPLOYEE_GENDER: { type: String, required: true, enum: ['MALE', 'FEMALE'] },
  EMPLOYEE_DATEOFBIRTH: { type: Date, required: true },
  EMPLOYEE_DATEOFJOINING: { type: Date, required: true },
  EMPLOYEE_TAKEHOME: { type: Number, required: true },
  EMPLOYEE_EMAIL: { type: String, required: true, unique: true, maxlength: 100 },
  EMPLOYEE_PHONENO: { type: String, required: true, unique: true, maxlength: 15 },
  EMPLOYEE_PASSWORD: { type: String, required: true, maxlength: 100 },
}, {
  timestamps: true // This option adds `createdAt` and `updatedAt` fields
});

const Employee = mongoose.model('Employee', employeeSchema, 'employee');

module.exports = Employee;