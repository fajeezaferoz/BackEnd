const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');

class AuthorizerSchemaService {
    constructor(authorizerRepository) {
        this.authorizerRepository = authorizerRepository;
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
        return {name:user.name, email:user.email, roles:user.roles}
    }
}

AuthorizerSchemaService._dependencies = ['authorizeRepository'];

module.exports = AuthorizerSchemaService;
