const { MongooseRepository } = require("ca-webutils");

class MongooseCustomerRepository extends MongooseRepository{
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

MongooseCustomerRepository._dependencies = ['customer']

module.exports = MongooseCustomerRepository;    