const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');

class AuthorizerSchemaService {
    constructor(authorizerRepository, otpRepository) {
        this.authorizerRepository = authorizerRepository;
        this.otpRepository = otpRepository;
    }

    async getAllAuthorizers() {
        return await this.authorizerRepository.getAll();
    }
 
    async getAuthorizerById(id) {
        return await this.authorizerRepository.findOne({ Authorizer_ID: id });
    }

    async createAuthorizer(authorizer) {
        authorizer.password = await bcrypt.hash(authorizer.password, 10);
        return await this.authorizerRepository.create(authorizer);
    }

    async updateAuthorizer(id, authorizerData) {
        return await this.authorizerRepository.update({ Authorizer_ID: id }, authorizerData);
    }

    async deleteAuthorizer(id) {
        return await this.authorizerRepository.remove({ Authorizer_ID: id });
    }

    async login({email, password}){
        let user = await this.authorizerRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});
        return this._userInfo(user);
    }
    
    _userInfo(user){
        return {name:user.name, email:user.email, roles:user.roles, userName: user.Authorizer_ID}
    }

    async generateOTP({ email }) {
        // Validate email in the otp model

        let userOTP = await this.otpRepository.findOne({email: email})
        if (userOTP) {
            await this.otpRepository.remove({email})
        }
        let user = await this.authorizerRepository.findOne({ email });
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

AuthorizerSchemaService._dependencies = ['authorizeRepository', 'otpRepository'];

module.exports = AuthorizerSchemaService;
