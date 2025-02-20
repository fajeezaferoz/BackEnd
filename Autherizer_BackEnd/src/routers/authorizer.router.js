const express = require('express');
const { expressx } = require('ca-webutils');
const authorizerSchemaController = require('../controllers/authorizer.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = authorizerSchemaController();

    router
     .route('/generateOTP')
     .post(routeHandler(controller.generateOTP))
    
    router
     .route('/verifyOTP')
     .post(routeHandler(controller.verifyOTP));

    router
        .route('/login')
        .post(routeHandler(controller.loginAuthorizer));

    router
        .route('/')
        .get(authorize('authorizer'), routeHandler(controller.getAllAuthorizers))
        .post(routeHandler(controller.addAuthorizer));

    router
        .route('/:id')
        .get(authorize('authorizer'), routeHandler(controller.getAuthorizerById))
        .put(authorize('authorizer'), routeHandler(controller.updateAuthorizer))
        .delete(authorize('authorizer'), routeHandler(controller.deleteAuthorizer));
    
    router
    .route('/current')
    .get(authorize('authorizer'),routeHandler(controller.currentAuthInfo))

    return router;
}

module.exports = createRouter;
