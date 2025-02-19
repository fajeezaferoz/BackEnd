const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Consider enabling this in production
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

    async calculateAverageResponseTime(tickets) {
        let totalResponseTime = 0;
        let count = 0;
    
        tickets.forEach(ticket => {
            if (ticket.ticketStatusHistory.length > 1) {
                const openStatus = ticket.ticketStatusHistory.find(status => status.status === "OPEN");
                const nextStatus = ticket.ticketStatusHistory.find(status => status.status === "PENDING");
                if (openStatus && nextStatus) {
                    const openTime = new Date(openStatus.changedAt).getTime();
                    const nextTime = new Date(nextStatus.changedAt).getTime();
                    const responseTime = (nextTime - openTime) / 1000; 
                    totalResponseTime += responseTime;
                    count++;
                }
            }
        });
        return count > 0 ? (totalResponseTime / count) : 0;
    }

    async calculateAverageResolutionTime(tickets){
        let totalResolutionTime = 0;
        let count = 0;

        tickets.forEach(ticket => {
            if (ticket.ticketStatusHistory.length > 1) {
                const openStatus = ticket.ticketStatusHistory.find(status => status.status === "OPEN");
                const closedStatus = ticket.ticketStatusHistory.find(status => status.status === "CLOSED");
                if (openStatus && closedStatus) {
                    const openTime = new Date(openStatus.changedAt).getTime();
                    const nextTime = new Date(closedStatus.changedAt).getTime();
                    const responseTime = (nextTime - openTime) / 1000; 
                    totalResolutionTime += responseTime;
                    count++;
                }
            }
        });
        return count > 0 ? (totalResolutionTime / count) : 0;
    }

    async getStats(id){
        const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVc2VyQXV0aGVudGljYXRvciIsImlhdCI6MTczOTkyNzM3NywiZXhwIjoxNzM5OTMwOTc3LCJjbGFpbXMiOnsibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiZW1wbG95ZWUiXSwidXNlck5hbWUiOiJqb2huLWRvZSJ9fQ.XVwVJqEMBOPA9rGx2mbC_62PwWufzAbyCBvGsc_V7uwT0t_frnzjPXm4cPptp7IJa3zKJ9xZ77n9wblVp5AvUlWs3mwizpgkoJjX9RxsICc-r95FPSepJpPnev9DUH3ScWOTx2qumbz47FsX2kBW2o5EIX5TgbGA7KWScAJ1NtCd9qDy9I2VgcUnKZwDs6XyRDG9kjK12-h8mGXSw1lMqoPzSs_aLgnWXGSgvOACJ04JnqmpDln3Xumx7X16byuiMcfFjW7ZWzEM2QxJPOvdLy6xvyQXCjVDVZnNghGZc7kCvziuKOh3quKL6M66o-ZfbHD8mb39ZMjNAYWlAPkOjg"
        const employee = await this.employeeRepository.findOne({ employeeId: id});
        if(!employee)
            throw new Error('Employee not found');

        const response = await axios.get(`https://localhost:8000/api/employees/${employee.employeeId}/tickets`, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const ticketsAssignedToEmployee = response.data
        employee.avgResolutionTime=await this.calculateAverageResponseTime(ticketsAssignedToEmployee);
        employee.avgResponseTime=await this.calculateAverageResolutionTime(ticketsAssignedToEmployee);
        return await this.updateEmployee(employee.employeeId, employee)
    }
}

EmployeeService._dependencies = ['employeeRepository'];

module.exports = EmployeeService;
