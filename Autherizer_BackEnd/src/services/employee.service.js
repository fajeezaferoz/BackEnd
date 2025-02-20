const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');

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

    async createEmployee(employee) {
        employee.password = await bcrypt.hash(employee.password, 10);
        return await this.employeeRepository.create(employee);
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

EmployeeService._dependencies = ['employeeRepository', 'otpRepository'];

module.exports = EmployeeService;
