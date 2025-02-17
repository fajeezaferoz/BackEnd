const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository{
    constructor(model){
        super(model);
    }

    async getTicketByEmpId(matcher = {}) {
        console.log(matcher); // matcher= {customerId: "guru-pruthvi"}

        return this.model.find(matcher)
        .populate({ 
            path: 'employeeId',
            model: 'employee', 
            localField: 'employeeId', 
            foreignField: 'employeeId',
            });

        // return await this.model.find({}).populate('customerID')
    }
} 

MongooseTicketRepository._dependencies = ['ticket']

module.exports = MongooseTicketRepository;    