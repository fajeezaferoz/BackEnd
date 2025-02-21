class NotificationService{
    constructor(notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    async getNotificationById(body) {
        if (!body?.userId || !body?.roles) {
            throw new Error("userId and role are required");
        }
    
        const notificationOfEmployee = await this.notificationRepository.getAll({ userId: body.userId });
        
        // Filter notifications based on role
        const notification = notificationOfEmployee.filter(n => {
            console.log(n.roles,"-----", body.roles);
            return n.roles.includes(body.roles)
        });
    
        return notification.length ? notification : [];
    }
    

    async createNotification(body){
        console.log(body);
        return await this.notificationRepository.create(body);
    }
}

NotificationService._dependencies = ['notificationRepository']

module.exports = NotificationService;