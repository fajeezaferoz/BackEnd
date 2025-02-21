const axios = require('axios');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, 
});

class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async getAllEmployees() {
        return await this.employeeRepository.getAll();
    }

    async getEmployeeById(id) {
        return await this.employeeRepository.findOne({ employeeId: id });
    } 

    async createEmployee(employee) {
        try{
            const response = await axios.post(`https://localhost:7000/api/employees`, employee, {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        }catch(error){
            throw new Error(error.response.data.message);
        }
    }

    async updateEmployee(id, employeeData) {
        return await this.employeeRepository.update({ employeeId: id }, employeeData);
    }

    async deleteEmployee(id) {
        return await this.employeeRepository.remove({ employeeId: id });
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
