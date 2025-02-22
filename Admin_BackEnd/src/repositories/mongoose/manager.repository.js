const { MongooseRepository } = require("ca-webutils");

class MongooseManagerRepository extends MongooseRepository{
    constructor(model){
        super(model); 
    }

    async deleteData(id){
        return this.model.findByIdAndDelete(id);
    }
} 

MongooseManagerRepository._dependencies = ['manager']

module.exports = MongooseManagerRepository;     