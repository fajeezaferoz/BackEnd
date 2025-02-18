const express = require('express');
const { expressx } = require('ca-webutils');
const employeeController = require('../controllers/employee.controller');
const ticketController = require('../controllers/tickets.controller');
const {authorize} = require('ca-webutils/jwt')
const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let employeeControll = employeeController();
    let ticketControll = ticketController();

    router
        .route('/')
        .get(authorize('employee'), routeHandler(employeeControll.getAllEmployees))
        .post(authorize('employee'), routeHandler(employeeControll.addEmployee));

    router
        .route('/:id')
        .get(authorize('employee'), routeHandler(employeeControll.getEmployeeById))
        .put(authorize('employee'), routeHandler(employeeControll.updateEmployee))
        .delete(authorize('employee'), routeHandler(employeeControll.deleteEmployee));

    router
        .route('/:id/tickets')
        .get(authorize('employee'), routeHandler(ticketControll.getTicketByEmpId))
    
    router
        .route('/:empId/tickets/:id')
        .get(authorize('employee'), routeHandler(ticketControll.getEmployeeSpecificId))
        .put(authorize('employee'), routeHandler(ticketControll.updateTicket))

    router
        .route('/:id/collegue')
        .get(authorize('employee'), routeHandler(employeeControll.getCollegue))

    return router;
}

module.exports = createRouter;
