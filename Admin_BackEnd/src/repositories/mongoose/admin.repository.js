const { MongooseRepository } = require("ca-webutils");

class MongooseAdminRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }

    async deleteData(id){
        return this.model.findByIdAndDelete(id);
    }
} 

MongooseAdminRepository._dependencies = ['admin']

module.exports = MongooseAdminRepository;    