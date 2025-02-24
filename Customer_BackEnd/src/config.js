const {injector, expressx} = require('ca-webutils')
  
// Customer module
const customer = require('./repositories/mongoose/models/customer.model')
const mongooseCustomerRepository = require('./repositories/mongoose/customer.repository')
const customerService = require('./services/customer.service')

// Ticket module
const ticket = require('./repositories/mongoose/models/tickets.model');
const mongooseTicketRepository = require('./repositories/mongoose/ticket.repository');
const ticketService = require('./services/tickets.service');

// Payment module
const payment = require('./repositories/mongoose/models/payment.model');
const mongoosePaymentRepository = require('./repositories/mongoose/payment.repository');
const paymentService = require('./services/payment.service')

injector
  // Customer module
  .addServiceObject('customer', customer)
  .addService('customerRepository', mongooseCustomerRepository)
  .addService('customerService', customerService)
  // Ticket module
  .addServiceObject('ticket', ticket)
  .addService('ticketRepository', mongooseTicketRepository)
  .addService('ticketService', ticketService)
  // Payment module
  .addServiceObject('payment', payment)
  .addService('paymentRepository', mongoosePaymentRepository)
  .addService('paymentService', paymentService)

expressx.addCustomError('MongoServerError', 400)

