const { MongooseRepository } = require("ca-webutils");

class MongooseAuthorizerRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }

    async getByEmailId(email){
        let user= await this.model.findOne(email);
        if(!user)
            throw new NotFoundError(`User with email ${email} not found`);
        return user;
    }
} 

MongooseAuthorizerRepository._dependencies = ['authorizer']

module.exports = MongooseAuthorizerRepository;    