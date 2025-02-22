const { MongooseRepository } = require("ca-webutils");

class MongooseEmployeeRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
    async deleteData(id){
        return this.model.findByIdAndDelete(id);
    }
} 

MongooseEmployeeRepository._dependencies = ['employee']

module.exports = MongooseEmployeeRepository;    