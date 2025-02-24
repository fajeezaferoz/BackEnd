const express = require('express');
const { expressx } = require('ca-webutils');
const employeeController = require('../controllers/employee.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = employeeController();

    router
     .route('/generateOTP')
     .post(routeHandler(controller.generateOTP))
    
    router
     .route('/verifyOTP')
     .post(routeHandler(controller.verifyOTP));

    router
        .route('/login')
        .post(routeHandler(controller.loginEmployee));

    router
        .route('/:id/password')
        .put(routeHandler(controller.updateByEmail));

    router
        .route('/')
        .get(authorize('employee'), routeHandler(controller.getAllEmployees))
        .post(routeHandler(controller.addEmployee));

    router
        .route('/:id')
        .get(authorize('employee'), routeHandler(controller.getEmployeeById))
        .put(authorize('employee'), routeHandler(controller.updateEmployee))
        .delete(authorize('employee'), routeHandler(controller.deleteEmployee));

    return router;
}

module.exports = createRouter;
