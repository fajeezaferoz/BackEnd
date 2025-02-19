const bcrypt = require('bcrypt');
const { AuthenticationError } = require('ca-webutils/errors');

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
        employee.password = await bcrypt.hash(employee.password, 10);
        return await this.employeeRepository.create(employee);
    }

    async updateEmployee(id, employeeData) {
        return await this.employeeRepository.update({ employeeId: id }, employeeData);
    }

    async deleteEmployee(id) {
        return await this.employeeRepository.remove({ employeeId: id });
    }

    async login({email, password}){
        let user = await this.employeeRepository.getByEmailId({email})
        if(!user) throw new AuthenticationError(`Invalid credentials:${email}`,{email});
        let match = await bcrypt.compare(password,user.password);    
        if(!match) 
            throw new AuthenticationError(`Invalid credentials: ${email}`,{email});9
        return this._userInfo(user);
    }
    
    _userInfo(user){
        console.log("_userInfo", user);
        return {name:user.name, email:user.email, roles: user.roles, userName: user.employeeId}
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
