const {injector, expressx} = require('ca-webutils')

const manager = require('./repositories/mongoose/models/manager.model');
const mongooseManagerRepository = require('./repositories/mongoose/manager.repository');
const managerService = require('./services/manager.service');

// Ticket module
const ticket = require('./repositories/mongoose/models/tickets.model');
const mongooseTicketRepository = require('./repositories/mongoose/ticket.repository');
const ticketService = require('./services/tickets.service');

// Employee module
const employee = require('./repositories/mongoose/models/employee.model')
const MongooseEmployeeRepository = require('./repositories/mongoose/employee.repository');
const employeeService = require('./services/employee.service')


injector
  // Manager module
  .addServiceObject('manager', manager)
  .addService('managerRepository', mongooseManagerRepository)
  .addService('managerService', managerService)

  // Ticket module
  .addServiceObject('ticket', ticket)
  .addService('ticketRepository', mongooseTicketRepository)
  .addService('ticketService', ticketService)

  // Employee module
  .addServiceObject('employee', employee)
  .addService('employeeRepository', MongooseEmployeeRepository)
  .addService('employeeService', employeeService);

expressx.addCustomError('MongoServerError', 400);