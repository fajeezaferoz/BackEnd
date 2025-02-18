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
        return await this.employeeRepository.create(employee);
    }

    async updateEmployee(id, employeeData) {
        return await this.employeeRepository.update({ employeeId: id }, employeeData);
    }

    async deleteEmployee(id) {
        return await this.employeeRepository.remove({ employeeId: id });
    }

    async getCollegues(id){
        const employee = await this.employeeRepository.findOne({ employeeId: id});
        if(!employee)
            throw new Error('Employee not found');
        return await this.employeeRepository.findAll({ managerId: employee.managerId });
    }

    async getStats(id){
        const employee = await this.employeeRepository.findOne({ employeeId: id});
        if(!employee)
            throw new Error('Employee not found');
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
