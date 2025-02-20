const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }
} 

MongooseTicketRepository._dependencies = ['otp']

module.exports = MongooseTicketRepository;    