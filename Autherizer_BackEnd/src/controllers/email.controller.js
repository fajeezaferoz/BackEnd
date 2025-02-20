const {injector} = require('ca-webutils')

const emailController = () => {
    const emailService = injector.getService('emailService');

    const sendEmail = async ({body}) => {
        
        return await emailService.sendEmail(body);
    }

    return {
        sendEmail
    }
}

module.exports = emailController