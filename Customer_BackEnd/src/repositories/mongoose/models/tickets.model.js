const mongoose = require('mongoose');
const customer = require('./customer.model');

const ticketSchema = new mongoose.Schema({
  ticketId: { 
    type: String, 
    required: true, 
    unique: true,
    default: function () {
      return `${this.customerId}-${Date.now()}`;
    }
  },  
  customerId: { type: String, ref: customer, required: true }, 
  employeeId: { type: String }, 
  ticketType: { type: String, required: true }, 
  ticketDescription: { type: String }, 
  ticketRaiseDate: { type: Date, required: true, default: Date.now}, 
  ticketStatus: { type: String, required: true, enum: ['PENDING', 'OPEN', 'CLOSED'], default: 'OPEN'},
  department: { type: String, required: true},
});



const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

module.exports = Ticket;