const { injector } = require('ca-webutils');

const notificationController = () => {
    const notificationService = injector.getService('notificationService');

    const getNotificationById = async ({ body }) => {
        return await notificationService.getNotificationById(body)
    }

    const createNotification = async ({ body }) => {
        return await notificationService.createNotification(body)
    }

    return {
        getNotificationById,
        createNotification,
    }
}

module.exports = notificationController;