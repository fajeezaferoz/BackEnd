const { injector, jwt } = require('ca-webutils')
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(process.cwd(),'keys','jwt2.private.key'),'utf-8');

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

    const updateByEmail = async ({body}) => {
        return await employeeService.updateByEmail(body)
    }

    const deleteEmployee = async ({ id }) => {
        return await employeeService.deleteEmployee(id)
    }

    const loginEmployee = async ({body}) => {
        let user = await employeeService.login(body);
        if(body.aud)
            user.aud=body.aud;
        if(body.sub)
            user.sub=user[body.sub];
        let token = await jwt.createToken(user,privateKey,{algorithm: 'RS256'},body.claims);
        return {token,user}
    }

    const currentEmployeeInfo = async ({request})=>{        
        return request.token;
    }

    const resetPassword = async ({body}) => {
        return null
    }

    const generateOTP = async ({body}) => {
        return await employeeService.generateOTP(body);
    }

    const verifyOTP = async ({body}) => {
        return await employeeService.verifyOTP(body);
    }

    return {
        getAllEmployees,
        getEmployeeById,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        loginEmployee,
        currentEmployeeInfo,
        resetPassword,
        generateOTP,
        verifyOTP,
        updateByEmail,
    }
}

module.exports = employeeController
