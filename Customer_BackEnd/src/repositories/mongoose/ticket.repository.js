const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }

    async getTicketByCustId(matcher = {}) {
        return this.model.find(matcher)
                .populate({ 
                    path: 'customerId',
                    model: 'customer', 
                    localField: 'customerId', 
                    foreignField: 'customerID',
                });
    }
} 

MongooseTicketRepository._dependencies = ['ticket']

module.exports = MongooseTicketRepository;    