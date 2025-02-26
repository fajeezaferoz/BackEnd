const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  employeeId: { type: String, unique: true },
  name: { type: String, required: true, maxlength: 50 }, //1
  managerId: { type: String, required: true }, //2
  username: { type: String, required: true}, //3
  designation: { type: String, required: true, maxlength: 50 }, //4
  department: { type: String, required: true, maxlength: 50 }, //5
  email: { type: String, required: true, unique: true, maxlength: 100 }, //6
  phoneNo: { type: String, required: true, unique: true, maxlength: 15 }, //7
  password: { type: String, required: true, maxlength: 100 }, //8
  avgResolutionTime: { type: Number, default: 0},
  roles: {type: Array, required: true, default:['employee']},
  avgResponseTime: { type: Number, default: 0}
}, { 
  timestamps: true // Adds createdAt and updatedAt
});

// Pre-save middleware to generate employeeId from name
employeeSchema.pre('save', function (next) {
  if (!this.employeeId) {
    this.employeeId = this.username.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

const Employee = mongoose.model('employee', employeeSchema, 'employee');

module.exports = Employee;
