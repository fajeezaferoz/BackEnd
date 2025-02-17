const { MongooseRepository } = require("ca-webutils");

class MongooseCustomerRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
} 

MongooseCustomerRepository._dependencies = ['customer']

module.exports = MongooseCustomerRepository;    