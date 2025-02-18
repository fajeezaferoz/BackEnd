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

    async getColleguesForManager(id){
        return await this.employeeRepository.getAll({managerId: id});
    }

    async getEmployeeByIdForManager({ id, managerId, ticketId }){
        return await this.employeeRepository.findOne({ managerId, id})
    }

    async getNumOfTicketsForEmployee({id}){
        return await this.employeeRepository.numOfTickets({employeeId: id})
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
