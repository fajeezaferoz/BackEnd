const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');

class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }

    async getAllAdmins() {
        return await this.adminRepository.getAll();
    }

    async getAdminById(id) {
        return await this.adminRepository.findOne({ Admin_ID: id });
    }

    async createAdmin(admin) {
        admin.password = await bcrypt.hash(admin.password, 10);
        return await this.adminRepository.create(admin);
    }

    async updateAdmin(id, adminData) {
        return await this.adminRepository.update({ Admin_ID: id }, adminData);
    }

    async login({email, password}){
        let user = await this.adminRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});
        return this._userInfo(user);
    }

    _userInfo(user){
        return {name:user.name, email:user.email, roles:user.roles}
    }

    async deleteAdmin(id) {
        return await this.adminRepository.remove({ Admin_ID: id });
    }
}

AdminService._dependencies = ['adminRepository'];

module.exports = AdminService;
