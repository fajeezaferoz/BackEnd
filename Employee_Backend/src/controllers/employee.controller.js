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

    const getCollegue = async ({id}) => {
        return await employeeService.getCollegues(id)
    }

    const getStats = async ({id, request}) => {
        const token = request.headers['authorization']?.split(' ')[1]
        return await employeeService.getStats(id, token)
    }

    return {
        getAllEmployees,
        getEmployeeById,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getCollegue,
        getStats,
    }
}

module.exports = employeeController
