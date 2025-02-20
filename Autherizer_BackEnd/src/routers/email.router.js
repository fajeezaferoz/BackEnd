const express = require('express');
const {expressx} = require('ca-webutils');
const emailController = require('../controllers/email.controller');

const createRouter = () => {
    const router = express.Router();
    let {routeHandler} = expressx;
    const controller = emailController()

    router
     .post('/', routeHandler(controller.sendEmail))
    
    return router;
}

module.exports = createRouter;