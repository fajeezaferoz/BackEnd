const { injector, jwt } = require('ca-webutils');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.join(process.cwd(),'keys','jwt2.private.key'),'utf-8');

const authorizerController = () => {
    const authorizerService = injector.getService('authorizerService');

    const getAllAuthorizers = async () => {
        return await authorizerService.getAllAuthorizers();
    };

    const getAuthorizerById = async ({ id }) => {
        return await authorizerService.getAuthorizerById(id);
    };

    const addAuthorizer = async ({ body }) => {
        
        return await authorizerService.createAuthorizer(body);
    };

    const updateAuthorizer = async ({ body, id }) => {
        return await authorizerService.updateAuthorizer(id, body);
    };

    const deleteAuthorizer = async ({ id }) => {
        return await authorizerService.deleteAuthorizer(id);
    };

    const loginAuthorizer = async ({body}) => {
        let user = await authorizerService.login(body);
        if(body.aud)
            user.aud=body.aud;
        if(body.sub)
            user.sub=user[body.sub];
        let token = await jwt.createToken(user,privateKey,{algorithm: 'RS256'},body.claims);
        return {token,user}
    }

    const currentAuthInfo = async ({request})=>{        
        return request.token;
    }

    const resetPassword = async ({body}) => {
        return null
    }

    const generateOTP = async ({body}) => {
        return await authorizerService.generateOTP(body);
    }

    const verifyOTP = async ({body}) => {
        return await authorizerService.verifyOTP(body);
    }

    return {
        getAllAuthorizers,
        getAuthorizerById,
        addAuthorizer,
        updateAuthorizer,
        deleteAuthorizer,
        loginAuthorizer,
        currentAuthInfo,
        resetPassword,
        generateOTP,
        verifyOTP,
    };
};

module.exports = authorizerController;
