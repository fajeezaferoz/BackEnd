const express = require('express');
const {expressx} = require('ca-webutils');
const notificationController = require('../controllers/notification.controller');

const createRouter = () => { 
    const router = express.Router();
    let {routeHandler} = expressx;
    const controller = notificationController()

    router
     .get('/', routeHandler(controller.getAllNotifications))
     .post('/', routeHandler(controller.createNotification));
    
    router
     .post('/getAll', routeHandler(controller.getNotificationById))
    
    return router;
}

module.exports = createRouter;