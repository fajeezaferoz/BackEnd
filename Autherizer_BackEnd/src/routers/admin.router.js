const express = require('express');
const { expressx } = require('ca-webutils');
const adminController = require('../controllers/admin.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let controller = adminController();
    
    router
     .route('/generateOTP')
     .post(routeHandler(controller.generateOTP))
    
    router
     .route('/verifyOTP')
     .post(routeHandler(controller.verifyOTP));

    router
        .route('/login')
        .post(routeHandler(controller.loginAdmin));
    
    router
        .route('/:id/password')
        .put(routeHandler(controller.updateByEmail));

    router
        .route('/')
        .get(authorize('admin'), routeHandler(controller.getAllAdmins))
        .post(routeHandler(controller.addAdmin));

    router
        .route('/:id')
        .get(authorize('admin'), routeHandler(controller.getAdminById))
        .put(authorize('admin'), routeHandler(controller.updateAdmin))
        .delete(authorize('admin'), routeHandler(controller.deleteAdmin));

    return router;
}

module.exports = createRouter;