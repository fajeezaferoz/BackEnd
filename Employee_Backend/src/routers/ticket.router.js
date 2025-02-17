const express = require('express');
const { expressx } = require('ca-webutils');
const ticketController = require('../controllers/tickets.controller');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = ticketController(); 

    router
        .route('/')
        .get(routeHandler(controller.getAllTickets))
        .post(routeHandler(controller.addTicket));

    router
        .route('/:id')
        .get(routeHandler(controller.getTicketById))
        .put(routeHandler(controller.updateTicket))
        .delete(routeHandler(controller.deleteTicket));

    return router;
}

module.exports = createRouter;
