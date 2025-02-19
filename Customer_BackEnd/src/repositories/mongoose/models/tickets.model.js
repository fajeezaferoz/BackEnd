const mongoose = require('mongoose'); 

const ticketSchema = new mongoose.Schema({
  ticketId: { 
    type: String, 
    required: true, 
    unique: true,
    default: function () {
      return `${this.customerId}-${Date.now()}`;
    }
  },  
  customerId: { type: String, required: true }, 
  employeeId: { type: String }, 
  ticketType: { type: String, required: true }, 
  ticketDescription: { type: String }, 
  ticketRaiseDate: { type: Date, required: true, default: Date.now}, 
  ticketStatus: { type: String, required: true, enum: ['PENDING', 'OPEN', 'CLOSED'], default: 'OPEN'},
  department: { type: String, required: true},
  ticketStatusHistory: [{
    status: { type: String, enum: ['PENDING', 'OPEN', 'CLOSED'], required: true },
    changedAt: { type: Date, default: Date.now }
  }],
  latitude: { type: Number }, // Store the latitude
  longitude: { type: Number }, // Store the longitude
},{ timestamps: true });

// Middleware to track status changes
ticketSchema.pre('save', function (next) {
  if (this.isModified('ticketStatus')) {
    this.ticketStatusHistory.push({ status: this.ticketStatus, changedAt: new Date() });
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

module.exports = Ticket;
