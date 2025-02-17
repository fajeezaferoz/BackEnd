const {injector, expressx} = require('ca-webutils');

// Employee module
const employee = require('./repositories/mongoose/models/employee.model')
const MongooseEmployeeRepository = require('./repositories/mongoose/employee.repository');
const employeeService = require('./services/employee.service')

// Ticket module

const ticket = require('./repositories/mongoose/models/tickets.model')
const MongooseTicketRepository = require('./repositories/mongoose/ticket.repository');
const ticketService = require('./services/tickets.service')


injector
  // Employee Module
  .addServiceObject('employee', employee)
  .addService('employeeRepository', MongooseEmployeeRepository)
  .addService('employeeService', employeeService)
  
  // Ticket Module
  .addServiceObject('ticket', ticket)
  .addService('ticketRepository', MongooseTicketRepository)
  .addService('ticketService', ticketService);

expressx.addCustomError('MongoServerError', 400)
