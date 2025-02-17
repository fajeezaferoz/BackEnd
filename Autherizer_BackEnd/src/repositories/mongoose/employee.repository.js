const { MongooseRepository } = require("ca-webutils");

class MongooseEmployeeRepository extends MongooseRepository{
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

MongooseEmployeeRepository._dependencies = ['employee']

module.exports = MongooseEmployeeRepository;    