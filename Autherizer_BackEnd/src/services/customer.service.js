const bcrypt = require('bcrypt');
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
        customer.password = await bcrypt.hash(customer.password, 10) 
        customer.roles = "customer"
        // user.password = await bcrypt.hash(user.password,10);
        return await this.customerRepository.create(customer);
    }

    async updateCustomer(id, customerData){
        return await this.customerRepository.update({customerID: id}, customerData);
    }

    async deleteCustomer(id){
        return await this.customerRepository.remove({customerID: id});
    }

    async login({email, password}){
        let user = await this.customerRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});
        user.roles=['customer']
        return this._userInfo(user);
    }

    _userInfo(user){
        return {name:user.name, email:user.email, roles: user.roles, userName: user.customerID}
    }
}

CustomerService._dependencies = ['customerRepository']

module.exports = CustomerService;