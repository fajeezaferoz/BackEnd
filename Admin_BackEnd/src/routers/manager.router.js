const express = require('express');
const { expressx } = require('ca-webutils');
const managerController = require('../controllers/manager.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = managerController();

    router
        .route('/')
        .get(authorize('admin'), routeHandler(controller.getAllManagers))
        .post(authorize('admin'), routeHandler(controller.addManager));

    router
        .route('/:id')
        .get(authorize('admin'), routeHandler(controller.getManagerById))
        .put(authorize('admin'), routeHandler(controller.updateManager))
        .delete(authorize('admin'), routeHandler(controller.deleteManager));

    return router;
};

module.exports = createRouter;
