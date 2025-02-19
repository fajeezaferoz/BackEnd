const { injector } = require('ca-webutils');

const managerController = () => {
    const managerService = injector.getService('managerService');

    const getAllManagers = async () => {
        return await managerService.getAllManagers();
    };

    const getManagerById = async ({ id }) => {
        return await managerService.getManagerById(id);
    };

    const addManager = async ({ body }) => {
        return await managerService.createManager(body);
    };

    const updateManager = async ({ body, id }) => {
        return await managerService.updateManager(id, body);
    };

    const deleteManager = async ({ id }) => {
        return await managerService.deleteManager(id);
    };

    const getStatusForManager = async ({ id, request }) => {
        const token = request.headers['authorization']?.split(' ')[1]
        return await managerService.getStatusForManager(id, token);
    }

    return {
        getAllManagers,
        getManagerById,
        addManager,
        updateManager,
        deleteManager,
        getStatusForManager,
    };
};

module.exports = managerController;
