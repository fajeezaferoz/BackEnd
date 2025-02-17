const express = require('express');
const { expressx } = require('ca-webutils');
const employeeController = require('../controllers/employee.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = employeeController();

    router
        .route('/')
        .get(authorize('admin'), routeHandler(controller.getAllEmployees))
        .post(authorize('admin'), routeHandler(controller.addEmployee));

    router
        .route('/:id')
        .get(authorize('admin'), routeHandler(controller.getEmployeeById))
        .put(authorize('admin'), routeHandler(controller.updateEmployee))
        .delete(authorize('admin'), routeHandler(controller.deleteEmployee));

    return router;
}

module.exports = createRouter;
