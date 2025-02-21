const {injector, expressx, jwt} = require('ca-webutils');

const manager = require('./repositories/mongoose/models/manager.model');
const mongooseManagerRepository = require('./repositories/mongoose/manager.repository');
const managerService = require('./services/manager.service');

// Employee module 
const employee = require('./repositories/mongoose/models/employee.model')
const MongooseEmployeeRepository = require('./repositories/mongoose/employee.repository');
const employeeService = require('./services/employee.service')

// Ticket module

const ticket = require('./repositories/mongoose/models/tickets.model')
const MongooseTicketRepository = require('./repositories/mongoose/ticket.repository');
const ticketService = require('./services/tickets.service')

// Admin module

const admin = require('./repositories/mongoose/models/admin.model')
const MongooseAdminRepository = require('./repositories/mongoose/admin.repository');
const adminService = require('./services/admin.service')

// Authorization Module

const authorization = require('./repositories/mongoose/models/authorizer.model')
const MongooseAuthorizationRepository = require('./repositories/mongoose/authorizer.repository');
const authorizationService = require('./services/authorizer.services')

// Customer Module

const customer = require('./repositories/mongoose/models/customer.model')
const MongooseCustomerRepository = require('./repositories/mongoose/customer.repository');
const customerService = require('./services/customer.service')

// OTP

const otp = require('./repositories/mongoose/models/otp.model')
const MongooseOtpRepository = require('./repositories/mongoose/otp.repository');


// Email
const emailService = require('./services/email.service');

// Notification 

const notificationService = require('./services/notification.service');
const notification = require('./repositories/mongoose/models/notification.model')
const NotificationRepository = require('./repositories/mongoose/notification.repository')


injector
  // JWT
  .addServiceObject('jwt',jwt)

    // Employee Module
  .addServiceObject('employee', employee)
  .addService('employeeRepository', MongooseEmployeeRepository)
  .addService('employeeService', employeeService) 

  // Ticket Module
  .addServiceObject('ticket', ticket)
  .addService('ticketRepository', MongooseTicketRepository)
  .addService('ticketService', ticketService)

  // Manager module
  .addServiceObject('manager', manager)
  .addService('managerRepository', mongooseManagerRepository)
  .addService('managerService', managerService)

  // Admin module
  .addServiceObject('admin', admin)
  .addService('adminRepository', MongooseAdminRepository)
  .addService('adminService', adminService)

  // Authorization Module
  .addServiceObject('authorizer', authorization)
  .addService('authorizeRepository', MongooseAuthorizationRepository)
  .addService('authorizerService', authorizationService)

  // Customer Module
  .addServiceObject('customer', customer)
  .addService('customerRepository', MongooseCustomerRepository)
  .addService('customerService', customerService)

   // OTP Module
  .addServiceObject('otp', otp)
  .addService('otpRepository', MongooseOtpRepository)
  // email module
  .addServiceObject('emailService', emailService)
  // notification module
  .addServiceObject('notification', notification)
  .addService('notificationRepository', NotificationRepository)
  .addService('notificationService', notificationService)
  
expressx.addCustomError('MongoServerError', 400)
