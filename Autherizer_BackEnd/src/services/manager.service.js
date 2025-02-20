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
        return {name:user.name, email:user.email, roles: user.roles, userName: user.managerId}
    }

    async generateOTP({ email }) {
        // Validate email in the otp model

        let userOTP = await this.otpRepository.findOne({email: email})
        if (userOTP) {
            console.log("Guru");
            await this.otpRepository.remove({email})
        }
        console.log("Pruthvi");
        
        let user = await this.customerRepository.getByEmailId({ email });
        if (!user) throw new AuthenticationError(`User with email ${email} not found`, { email });

        let otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string
        const encryptedOTP = await CryptoJS.AES.encrypt(otp, process.env.JWT_SECRET).toString();
        console.log(otp,  CryptoJS.AES.decrypt(encryptedOTP, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8));
        
        const data = {
            email: user.email,
            otp: encryptedOTP
        };
        return await this.otpRepository.create(data);
    }
    
        async verifyOTP({ email, otp }) {
            let user = await this.otpRepository.findOne({ email });
            if (!user) throw new AuthenticationError(`User with email ${email} not found`, { email });
            const decryptedOTP = await CryptoJS.AES.decrypt(user.otp, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);
            if (decryptedOTP!= otp) throw new AuthenticationError(`Invalid OTP`, { email });
            await this.otpRepository.remove(email);
            return {
                status: 200,
                message: "OTP verification successful",
                data: { email }
            };
        }
}

ManagerService._dependencies = ['managerRepository', 'otpRepository'];

module.exports = ManagerService; 
