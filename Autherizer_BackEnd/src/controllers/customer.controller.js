const {injector, jwt} = require('ca-webutils')
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(process.cwd(),'keys','jwt2.private.key'),'utf-8');

const customerController = () =>{ 
    const customerService = injector.getService('customerService')
  
    const getAllCustomer = async () => {
        return await customerService.getAllCustomers()
    }  
    const getCustomerById = async ({id}) => {
        return await customerService.getCustomerById(id)
    }
    const addCustomer = async ({body}) => {
        return await customerService.createCustomer(body) 
    }   
    const updateCustomer = async ({body, id}) => await customerService.updateCustomer(id, body)

    const updateByEmail = async ({body}) => {
        return await customerService.updateByEmail(body)
    }

    const deleteCustomer = async ({id}) => await customerService.deleteCustomer(id)

    const loginCustomer = async ({body}) => {
        let user = await customerService.login(body);
        if(body.aud)
            user.aud=body.aud;
        if(body.sub)
            user.sub=user[body.sub];
        
        
        let token = await jwt.createToken(user,privateKey,{algorithm: 'RS256'},body.claims);
        return {token,user}
    }

    const currentUserInfo = async ({request})=>{        
        return request.token;
    }

    const resetPassword = async ({body}) => {
        return null
    }

    const validateOTP = async ({body}) => {
        return await customerService.otpForValidateEmail(body);
    }

    const generateOTP = async ({body}) => {
        return await customerService.generateOTP(body);
    }

    const verifyOTP = async ({body}) => {
        return await customerService.verifyOTP(body);
    }
    
    return {
        getAllCustomer,
        getCustomerById,  
        addCustomer,
        updateCustomer,
        deleteCustomer,
        loginCustomer,
        currentUserInfo,
        resetPassword,
        generateOTP, 
        verifyOTP,
        validateOTP,
        updateByEmail
    }
}

module.exports = customerController