const axios = require('axios');
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

    async getLatLong(pincode) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(pincode)}&format=json&limit=1`
        );
    
        if (response.data.length > 0) {
          return {
            latitude: parseFloat(response.data[0].lat),
            longitude: parseFloat(response.data[0].lon),
          };
        } else {
          throw new Error('Pincode not found.');
        }
      } catch (error) {
        console.error('Geocoding Error:', error.message);
        return { latitude: null, longitude: null };
      }
    }

    async updateCustomer(id, customerData){
        const latAndLong = await this.getLatLong(customerData.pincode);
        customerData.latitude = latAndLong.latitude;
        customerData.longitude = latAndLong.longitude;
        return await this.customerRepository.update({customerID: id}, customerData);
    }

    async deleteCustomer(id){
        return await this.customerRepository.remove({customerID: id});
    }
}

CustomerService._dependencies = ['customerRepository']

module.exports = CustomerService;