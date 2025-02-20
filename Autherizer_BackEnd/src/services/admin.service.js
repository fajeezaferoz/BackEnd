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
        return {name:user.name, email:user.email, roles:user.roles, userName: user.Admin_ID}
    }

    async deleteAdmin(id) {
        return await this.adminRepository.remove({ Admin_ID: id });
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

AdminService._dependencies = ['adminRepository'];

module.exports = AdminService;
