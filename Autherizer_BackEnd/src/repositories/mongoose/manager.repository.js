const { MongooseRepository } = require("ca-webutils");

class MongooseManagerRepository extends MongooseRepository{
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

MongooseManagerRepository._dependencies = ['manager']

module.exports = MongooseManagerRepository;     