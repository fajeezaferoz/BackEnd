const { injector } = require('ca-webutils');

const managerController = () => {
    const managerService = injector.getService('managerService');

    const getAllManagers = async () => {
        return await managerService.getAllManagers();
    };

    const getManagerById = async ({ id }) => {
        return await managerService.getManagerById(id);
    };

    const addManager = async ({ body, request }) => {
        const token = request.headers['authorization']?.split(' ')[1]
        return await managerService.createManager(body, token);
    };

    const updateManager = async ({ body, id, mrgId }) => {
        return await managerService.updateManager(id, body, mrgId);
    };

    const deleteManager = async ({ mrgId }) => {
        return await managerService.deleteManager(mrgId);
    };

    return {
        getAllManagers,
        getManagerById,
        addManager,
        updateManager,
        deleteManager,
    };
};

module.exports = managerController;
