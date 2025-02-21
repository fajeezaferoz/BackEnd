const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');
const CryptoJS = require('crypto-js');
const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, 
});

class EmployeeService {
    constructor(employeeRepository, otpRepository) {
        this.employeeRepository = employeeRepository;
        this.otpRepository = otpRepository;
    }

    async getAllEmployees() {
        return await this.employeeRepository.getAll();
    }

    async getEmployeeById(id) {
        return await this.employeeRepository.findOne({ employeeId: id });
    }

    async sendEmail(employee){
        const emailData = {
            subject: `Welcome to Brillio`,
            htmlVal: `
            <p>Dear ${employee.name}</p>
            <p>Welcome to Brillio! We're excited to have you join our team. Please find below your login credentials:</p>
            <p>Email: <b>${employee.email}</b></p>
            <p>Password: ${employee.password}</p>
            <p>Thank you for joining Brillio, and we look forward to working with you!</p>
            <p>Regards,<p>
            CodeCrafters
            `,
            to: employee.email
        }
        try{
            axios.post(`https://localhost:7000/api/email`, emailData, {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }catch(error){
            throw new Error('Failed to send email');
        }
    }

    async createEmployee(employee) {
        await this.sendEmail(employee);
        employee.password = await bcrypt.hash(employee.password, 10);
        const responce = await this.employeeRepository.create(employee);
        return responce;
    }

    async updateEmployee(id, employeeData) {
        return await this.employeeRepository.update({ employeeId: id }, employeeData);
    }

    async deleteEmployee(id) {
        return await this.employeeRepository.remove({ employeeId: id });
    }

    async login({email, password}){
        let user = await this.employeeRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});9
        return this._userInfo(user);
    }
    
    _userInfo(user){
        console.log("_userInfo", user);
        return {name:user.name, email:user.email, roles: user.roles, userName: user.employeeId}
    }

    async generateOTP({ email }) {
        // Validate email in the otp model

        let userOTP = await this.otpRepository.findOne({email: email})
        if (userOTP) {
            await this.otpRepository.remove({email})
        }
        let user = await this.employeeRepository.findOne({ email });
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

EmployeeService._dependencies = ['employeeRepository', 'otpRepository'];

module.exports = EmployeeService;
