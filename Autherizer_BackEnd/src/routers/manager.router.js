const express = require('express');
const { expressx } = require('ca-webutils');
const managerController = require('../controllers/manager.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = managerController();

    router
     .route('/generateOTP')
     .post(routeHandler(controller.generateOTP))
    
    router
     .route('/verifyOTP')
     .post(routeHandler(controller.verifyOTP));

    router
        .route('/login')
        .post(routeHandler(controller.loginManager));
    
    router
        .route('/:id/password')
        .put(routeHandler(controller.updateByEmail));

    router
        .route('/')
        .get(authorize('manager'), routeHandler(controller.getAllManagers))
        .post(routeHandler(controller.addManager));

    router
        .route('/:id')
        .get(authorize('manager'), routeHandler(controller.getManagerById))
        .put(authorize('manager'), routeHandler(controller.updateManager))
        .delete(authorize('manager'), routeHandler(controller.deleteManager));

    return router;
};

module.exports = createRouter;
