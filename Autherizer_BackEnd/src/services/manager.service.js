const { AuthenticationError } = require("ca-webutils/errors");
const bcrypt = require('bcrypt');

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
        manager.password = await bcrypt.hash(manager.password, 10);
        return await this.managerRepository.create(manager);
    }

    async updateManager(id, managerData) {
        return await this.managerRepository.update({ Manager_ID: id }, managerData);
    }

    async deleteManager(id) {
        return await this.managerRepository.remove({ Manager_ID: id });
    }

    async login({email, password}){
        let user = await this.managerRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});
        return this._userInfo(user);
    }

    _userInfo(user){
        console.log(user);
        
        return {name:user.name, email:user.email, roles: user.roles, userName: user.managerId}
    }
}

ManagerService._dependencies = ['managerRepository'];

module.exports = ManagerService; 
