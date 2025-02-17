const { MongooseRepository } = require("ca-webutils");

class MongooseManagerRepository extends MongooseRepository{
    constructor(model){
        super(model); 
    }
} 

MongooseManagerRepository._dependencies = ['manager']

module.exports = MongooseManagerRepository;     