const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }

    async deleteData(id){
        return this.model.findByIdAndDelete(id);
    }
} 

MongooseTicketRepository._dependencies = ['ticket']

module.exports = MongooseTicketRepository;    