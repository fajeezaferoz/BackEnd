const { MongooseRepository } = require("ca-webutils");

class MongoosePaymentRepository extends MongooseRepository{
    constructor(model){
        super(model);
        this.model = model;
    }

    async paymentHistory(matcher = {}) {

        return this.model.find(matcher)
        .populate({ 
            path: 'customerId',
            model: 'customer', 
            localField: 'customerId', 
            foreignField: 'customerID',
            });

        // return await this.model.find({}).populate('customerID')
    }
}

MongoosePaymentRepository._dependencies = ['payment']

module.exports = MongoosePaymentRepository;    