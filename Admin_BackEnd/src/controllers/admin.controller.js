const { injector } = require('ca-webutils')

const adminController = () => {
    const adminService = injector.getService('adminService')

    const getAllAdmins = async () => {
        return await adminService.getAllAdmins()
    }

    const getAdminById = async ({ id }) => {
        return await adminService.getAdminById(id)
    }

    const addAdmin = async ({ body }) => {
        return await adminService.createAdmin(body)
    }

    const updateAdmin = async ({ body, id }) => {
        return await adminService.updateAdmin(id, body)
    }

    const deleteAdmin = async ({ id }) => {
        return await adminService.deleteAdmin(id)
    }

    return {
        getAllAdmins,
        getAdminById,
        addAdmin,
        updateAdmin,
        deleteAdmin,
    }
}

module.exports = adminController
