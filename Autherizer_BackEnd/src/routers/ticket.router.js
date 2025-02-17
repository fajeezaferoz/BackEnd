const express = require('express');
const { expressx } = require('ca-webutils');
const ticketController = require('../controllers/tickets.controller');
const { authenticate } = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = ticketController(); 

    router
        .route('/')
        .get(authenticate, routeHandler(controller.getAllTickets))
        .post(routeHandler(controller.addTicket));

    router
        .route('/:id')
        .get(authenticate, routeHandler(controller.getTicketById))
        .put(authenticate, routeHandler(controller.updateTicket))
        .delete(authenticate, routeHandler(controller.deleteTicket));

    return router;
}

module.exports = createRouter;
