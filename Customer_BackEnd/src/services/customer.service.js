class CustomerService{
    constructor(customerRepository){
        this.customerRepository = customerRepository;
    }

    async getAllCustomers(){
        return await this.customerRepository.getAll();
    } 

    async getCustomerById(id){
        return await this.customerRepository.findOne({customerID: id});
    }
  
    async createCustomer(customer){
        return await this.customerRepository.create(customer);
    }

    async updateCustomer(id, customerData){
        return await this.customerRepository.update({customerID: id}, customerData);
    }

    async deleteCustomer(id){
        return await this.customerRepository.remove({customerID: id});
    }
}

CustomerService._dependencies = ['customerRepository']

module.exports = CustomerService;