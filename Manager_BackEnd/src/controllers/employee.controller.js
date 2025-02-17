const { injector } = require('ca-webutils')

const employeeController = () => {
    const employeeService = injector.getService('employeeService')

    const getAllEmployees = async () => {
        return await employeeService.getAllEmployees()
    }

    const getEmployeeById = async ({ id }) => {
        return await employeeService.getEmployeeById(id)
    }

    const addEmployee = async ({ body }) => {
        return await employeeService.createEmployee(body)
    }

    const updateEmployee = async ({ body, id }) => {
        return await employeeService.updateEmployee(id, body)
    }

    const deleteEmployee = async ({ id }) => {
        return await employeeService.deleteEmployee(id)
    }

    const getColleguesForManager = async ({ id }) => {
        return await employeeService.getColleguesForManager(id)
    }

    const getEmployeeByIdForManager = async ({ id, managerId }) => {
        return await employeeService.getEmployeeById(id, managerId)
    }
    
    const getNumOfTicketsForEmployeeForManager = async ({ id }) => {
        return await employeeService.getNumOfTicketsForEmployee(id)
    }

    return {
        getAllEmployees,
        getEmployeeById,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getColleguesForManager,
        getEmployeeByIdForManager,
        getNumOfTicketsForEmployeeForManager,
    }
}

module.exports = employeeController
