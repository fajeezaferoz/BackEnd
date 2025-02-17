class ManagerService {
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }

    async getAllManagers() {
        return await this.managerRepository.getAll();
    }

    async getManagerById(id) {
        return await this.managerRepository.findOne({ Manager_ID: id });
    }

    async createManager(manager) {
        return await this.managerRepository.create(manager);
    }

    async updateManager(id, managerData) {
        return await this.managerRepository.update({ Manager_ID: id }, managerData);
    }

    async deleteManager(id) {
        return await this.managerRepository.remove({ Manager_ID: id });
    }
}

ManagerService._dependencies = ['managerRepository'];

module.exports = ManagerService; 
