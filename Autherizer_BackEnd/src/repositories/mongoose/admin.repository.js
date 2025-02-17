const { MongooseRepository } = require("ca-webutils");
const { NotFoundError } = require("ca-webutils/errors");

class MongooseAdminRepository extends MongooseRepository{
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

MongooseAdminRepository._dependencies = ['admin']

module.exports = MongooseAdminRepository;    