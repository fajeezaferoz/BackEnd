class PaymentService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    async getAllPayments() {
        return await this.paymentRepository.getAll();
    }

    async getPaymentById(id) {
        return await this.paymentRepository.findOne({ payId: id });
    }

    async createPayment(payment) {
        let paymentByCustomer = await this.getPaymentsByCustomerId(payment.customerId);
        let departmentPurchased = paymentByCustomer.find(p=>p.department===payment.department);
        if(departmentPurchased) {
            throw new Error("Customer has already made a purchase in this department/service");
        }
        if(payment.amount>0)
            return await this.paymentRepository.create(payment);
        throw new Error("amount must be greater than zero");
    }

    async updatePayment(id, paymentData) {
        return await this.paymentRepository.update({ payId: id }, paymentData);
    }

    async deletePayment(id) {
        return await this.paymentRepository.remove({ payId: id });
    }

    async getPaymentsByCustomerId(custId) {
        return await this.paymentRepository.paymentHistory({ customerId: custId });
    }
}

PaymentService._dependencies = ['paymentRepository'];

module.exports = PaymentService;
