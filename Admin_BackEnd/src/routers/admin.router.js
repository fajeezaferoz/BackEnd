const express = require('express');
const { expressx } = require('ca-webutils');
const adminController = require('../controllers/admin.controller');
const employeeController = require('../controllers/employee.controller');
const managerController = require('../controllers/manager.controller');
const {authorize} = require('ca-webutils/jwt');

const createRouter = () => {
    const router = express.Router();
    let { routeHandler } = expressx;
    let admincontrol = adminController();
    let employeecontrol = employeeController();
    let managercontrol = managerController();
    router
        .route('/')
        .get(authorize('admin'), routeHandler(admincontrol.getAllAdmins))
        .post(authorize('admin'), routeHandler(admincontrol.addAdmin));

    router
        .route('/:id')
        .get(authorize('admin'), routeHandler(admincontrol.getAdminById))
        .put(authorize('admin'), routeHandler(admincontrol.updateAdmin))
        .delete(authorize('admin'), routeHandler(admincontrol.deleteAdmin));
    
    router
        .route('/:id/employee')
        .post(authorize('admin'), routeHandler(employeecontrol.addEmployee))
        .get(authorize('admin'), routeHandler(employeecontrol.getAllEmployees))
        .put(authorize('admin'), routeHandler(employeecontrol.updateEmployee))
        .delete(authorize('admin'), routeHandler(employeecontrol.deleteEmployee));
    
    router
        .route('/:id/managers')
        .post(authorize('admin'), routeHandler(managercontrol.addManager))
        .get(authorize('admin'), routeHandler(managercontrol.getAllManagers))
        .put(authorize('admin'), routeHandler(managercontrol.updateManager))
        .delete(authorize('admin'), routeHandler(managercontrol.deleteManager));

    return router;
}

module.exports = createRouter;