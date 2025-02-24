const {injector} = require('ca-webutils')

const customerController = () =>{
    const customerService = injector.getService('customerService')
  
    const getAllCustomer = async () => {
        return await customerService.getAllCustomers()
    }  
    const getCustomerById = async ({id}) => {
        return await customerService.getCustomerById(id)
    }
    const addCustomer = async ({body}) => {
        return await customerService.createCustomer(body) 
    }   
    const updateCustomer = async ({body, id}) => {
        await customerService.updateCustomer(id, body)
    }
    const deleteCustomer = async ({id}) => await customerService.deleteCustomer(id)

    return {
        getAllCustomer, 
        getCustomerById,  
        addCustomer,
        updateCustomer,
        deleteCustomer,
    }
}

module.exports = customerController