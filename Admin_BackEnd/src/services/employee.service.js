class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async getAllEmployees() {
        return await this.employeeRepository.getAll();
    }

    async getEmployeeById(id) {
        return await this.employeeRepository.findOne({ EMPLOYEE_ID: id });
    }

    async createEmployee(employee) {
        return await this.employeeRepository.create(employee);
    }

    async updateEmployee(id, employeeData) {
        return await this.employeeRepository.update({ EMPLOYEE_ID: id }, employeeData);
    }

    async deleteEmployee(id) {
        return await this.employeeRepository.remove({ EMPLOYEE_ID: id });
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
