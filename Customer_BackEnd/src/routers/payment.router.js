const express = require('express');
const { expressx } = require('ca-webutils');
const paymentController = require('../controllers/payment.controller');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = paymentController(); 

    router
        .route('/')
        .get(routeHandler(controller.getAllPayments))
        .post(routeHandler(controller.addPayment));

    router
        .route('/:id')
        .get(routeHandler(controller.getPaymentById))
        .put(routeHandler(controller.updatePayment))
        .delete(routeHandler(controller.deletePayment));

    

    return router;
}

module.exports = createRouter;
