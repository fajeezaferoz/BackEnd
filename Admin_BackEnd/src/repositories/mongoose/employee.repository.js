const { MongooseRepository } = require("ca-webutils");

class MongooseEmployeeRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
} 

MongooseEmployeeRepository._dependencies = ['employee']

module.exports = MongooseEmployeeRepository;    