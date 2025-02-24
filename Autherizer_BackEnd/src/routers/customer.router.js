const express = require('express');
const {expressx} = require('ca-webutils');
const customerController = require('../controllers/customer.controller');
const {authenticate,authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let {routeHandler} = expressx;
    let controller = customerController() 
 
    router
    .route('/login')
    .post(routeHandler(controller.loginCustomer));

    router
     .route('/generateOTP')
     .post(routeHandler(controller.generateOTP))

    router
     .route('/validateTheOTP')
     .post(routeHandler(controller.validateOTP));
    
    router
     .route('/verifyOTP')
     .post(routeHandler(controller.verifyOTP));
    
    router
     .route('/resetPassword')
     .post(routeHandler(controller.resetPassword)) 

    router
     .route('/')
     .get(authenticate, routeHandler(controller.getAllCustomer))
     .post(routeHandler(controller.addCustomer));   

    router
     .route('/:id')
     .get(authenticate, routeHandler(controller.getCustomerById))
     .put(authenticate, routeHandler(controller.updateCustomer))
     .delete(authenticate, routeHandler(controller.deleteCustomer));

    router
     .route('/:id/password')
     .put(routeHandler(controller.updateByEmail));
    
    router
     .route('/current')
     .get(authenticate,routeHandler(controller.currentUserInfo))



    return router;
}

module.exports = createRouter;