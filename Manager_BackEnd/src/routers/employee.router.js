const express = require('express');
const { expressx } = require('ca-webutils');
const employeeController = require('../controllers/employee.controller');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = employeeController();

    router
        .route('/')
        .get(routeHandler(controller.getAllEmployees))
        .post(routeHandler(controller.addEmployee));

    router
        .route('/:id')
        .get(routeHandler(controller.getEmployeeById))
        .put(routeHandler(controller.updateEmployee))
        .delete(routeHandler(controller.deleteEmployee));
    
    
 
    return router;
}

module.exports = createRouter;
