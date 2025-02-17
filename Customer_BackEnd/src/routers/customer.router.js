const express = require('express');
const {expressx} = require('ca-webutils');
const customerController = require('../controllers/customer.controller');
const paymentController = require('../controllers/payment.controller');
const ticketController = require('../controllers/tickets.controller');
const {authenticate} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let {routeHandler} = expressx;
    let customerControl = customerController() 
    let paymentControl = paymentController()
    let ticketControl = ticketController()
 
    router
     .route('/')
     .get(authenticate, routeHandler(customerControl.getAllCustomer))
     .post(routeHandler(customerControl.addCustomer));

    router
     .route('/:id')
     .get(authenticate, routeHandler(customerControl.getCustomerById))
     .put(authenticate, routeHandler(customerControl.updateCustomer))
     .delete(authenticate, routeHandler(customerControl.deleteCustomer));
    
     router
     .route('/:id/payments')
     .get(authenticate, routeHandler(paymentControl.getPaymentsByCustomerId))
     .post(authenticate, routeHandler(paymentControl.addPayment));
    
    router
        .route('/:id/tickets')
        .get(authenticate, routeHandler(ticketControl.getTicketByCustId))
        .post(routeHandler(ticketControl.addTicket));

    return router;
}

module.exports = createRouter;