const express = require('express');
const { expressx } = require('ca-webutils');
const managerController = require('../controllers/manager.controller');
const ticketController = require('../controllers/tickets.controller');
const employeeController = require('../controllers/employee.controller');
const {authorize} = require('ca-webutils/jwt')
const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = managerController();
    let ticketControl = ticketController();
    let employeeControl = employeeController()

    router
        .route('/')
        .get(authorize('manager', 'customer'), routeHandler(controller.getAllManagers))
        .post(routeHandler(controller.addManager));

    router
        .route('/:id')
        .get(authorize('manager', 'customer'), routeHandler(controller.getManagerById))
        .put(authorize('manager'), routeHandler(controller.updateManager))
        .delete(authorize('manager'), routeHandler(controller.deleteManager));
    
    router
    // Add other routes here as needed...
        .route('/:id/ticketStatus')
        .get(authorize('manager'), routeHandler(ticketControl.getTicketCountByStatusForManager))
        
    router
        .route('/:managerId/ticketStatus/:id')
        .get(authorize('manager'), routeHandler(ticketControl.getMangerSpecifiedTicket))
    
    router
        .route('/:managerId/ticketStatus/:id/:ticketId')
        .get(authorize('manager'), routeHandler(ticketControl.getMangerSpecifiedTicket))
    
    router
        .route('/:id/collegue/ticketCount')
        .get(authorize('manager', 'customer'), routeHandler(ticketControl.getTicketCountByEmployeeForManager))
    
    router
        .route('/:id/collegue')
        .get(authorize('manager'), routeHandler(employeeControl.getColleguesForManager))
    

    router
        .route('/:managerId/collegue/:id')
        .get(authorize('manager'), routeHandler(employeeControl.getEmployeeByIdForManager))

    router
        .route('/:id/collegue/numOfTickets')
        .get(authorize('manager'), routeHandler(employeeControl.getNumOfTicketsForEmployeeForManager))

    router
        .route('/:id/stats')
        .get(authorize('manager'), routeHandler(controller.getStatusForManager))

    return router;
};

module.exports = createRouter;
