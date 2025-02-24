const { injector, jwt } = require('ca-webutils');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(process.cwd(),'keys','jwt2.private.key'),'utf-8');


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

    const updateByEmail = async ({body}) => {
        return await managerService.updateByEmail(body)
    }

    const deleteManager = async ({ id }) => {
        return await managerService.deleteManager(id);
    };

    const loginManager = async ({body}) => {
        let user = await managerService.login(body);
        if(body.aud)
            user.aud=body.aud;
        if(body.sub)
            user.sub=user[body.sub];
        let token = await jwt.createToken(user,privateKey,{algorithm: 'RS256'},body.claims);
        return {token,user}
    }

    const currentManagerInfo = async ({request})=>{        
        return request.token;
    }

    const resetPassword = async ({body}) => {
        return null
    }

    const generateOTP = async ({body}) => {
        return await managerService.generateOTP(body);
    }

    const verifyOTP = async ({body}) => {
        return await managerService.verifyOTP(body);
    }

    return {
        getAllManagers,
        getManagerById,
        addManager,
        updateManager,
        deleteManager,
        loginManager,
        currentManagerInfo,
        resetPassword,
        generateOTP,
        verifyOTP,
        updateByEmail,
    };
};

module.exports = managerController;
