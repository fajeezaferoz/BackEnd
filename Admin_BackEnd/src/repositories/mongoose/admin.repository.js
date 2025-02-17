const { MongooseRepository } = require("ca-webutils");

class MongooseAdminRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
} 

MongooseAdminRepository._dependencies = ['admin']

module.exports = MongooseAdminRepository;    