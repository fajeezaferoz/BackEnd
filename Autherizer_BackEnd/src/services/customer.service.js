const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const { emit } = require('../repositories/mongoose/models/otp.model');
const { AuthenticationError } = require('ca-webutils/errors');

class CustomerService{
    constructor(customerRepository, otpRepository){
        this.customerRepository = customerRepository;
        this.otpRepository = otpRepository;
    }

    async getAllCustomers(){
        return await this.customerRepository.getAll();
    } 

    async getCustomerById(id){
        return await this.customerRepository.findOne({customerID: id});
    }
  
    async createCustomer(customer){
        customer.password = await bcrypt.hash(customer.password, 10) 
        return await this.customerRepository.create(customer);
    }

    async updateCustomer(id, customerData){
        return await this.customerRepository.update({customerID: id}, customerData);
    }

    async deleteCustomer(id){
        return await this.customerRepository.remove({customerID: id});
    }

    async login({email, password}){
        let user = await this.customerRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});
        user.roles=['customer']
        return this._userInfo(user);
    }

    _userInfo(user){
        return {name:user.name, email:user.email, roles: user.roles, userName: user.customerID}
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

CustomerService._dependencies = ['customerRepository', 'otpRepository']

module.exports = CustomerService;