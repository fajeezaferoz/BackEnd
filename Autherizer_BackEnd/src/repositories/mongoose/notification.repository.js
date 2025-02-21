const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
} 

MongooseTicketRepository._dependencies = ['notification']

module.exports = MongooseTicketRepository;    