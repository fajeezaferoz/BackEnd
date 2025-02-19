const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Consider enabling this in production
});
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVc2VyQXV0aGVudGljYXRvciIsImlhdCI6MTczOTkyOTk4OCwiZXhwIjoxNzM5OTMzNTg4LCJjbGFpbXMiOnsibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZXMiOlsibWFuYWdlciJdLCJ1c2VyTmFtZSI6ImpvaG5kb2UifX0.Lhk0vSzhJK6idc4HU4rnVmPjlXe8XMtL_IVgPqKh4Mh8GsmKutyxk8fMFpp9TD_uZpngI3fX_OMBYhZf_SVR-k-0IRBZlX3eDqCzTTjbMDo_MN4OGaSSvsMKciKdDfrWcZUdU5uGuobGp2Xux7P2eINbTLl9qnRh8auxAwujOQHaZYjRPf9UpWBUiibWep8Q6vVo3xKS8v9IzGBAV0Ez811juKsn6wCev5x_wrwx0d3DNpch8DEhgfXyy62J64NxDER_Ltn2E_IYNVy0tFBhYA67ZxnvtT9D8onkisgDWd7CNGgFizw-KOCUbPCfvwko3H6PX5AmBK-yV_ccf2sUVw"

class ManagerService {
    constructor(managerRepository) {
        this.managerRepository = managerRepository;
    }

    async getAllManagers() {
        return await this.managerRepository.getAll();
    }

    async getManagerById(id) {
        return await this.managerRepository.findOne({ managerId: id });
    }

    async createManager(manager) {
        return await this.managerRepository.create(manager);
    }

    async updateManager(id, managerData) {
        return await this.managerRepository.update({ managerId: id }, managerData);
    }

    async deleteManager(id) {
        return await this.managerRepository.remove({ managerId: id });
    }

    async getStatusForManager(id){
        const manager = await this.getManagerById(id)
        if(!manager)
            throw new Error('Manager not found')
        const response = await axios.get(`https://localhost:5000/api/managers/${id}/collegue`, {
            httpsAgent,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const getAllEmployeeUnderManager=response.data
        if(!getAllEmployeeUnderManager)
            throw new Error('Could not find any employee under manager')
        let responseTime=0
        let resolutionTime=0
        getAllEmployeeUnderManager.forEach(employee => {
            responseTime+=employee.avgResponseTime||0
            resolutionTime+=employee.avgResolutionTime||0
        });
        const numOfEmployees=getAllEmployeeUnderManager.length
        let avgResolutionTime=resolutionTime/numOfEmployees
        let avgResponseTime=responseTime/numOfEmployees
        console.log(responseTime, resolutionTime);
        
        manager.avgResolutionTime=avgResolutionTime
        manager.avgResponseTime=avgResponseTime
        await this.updateManager(id, manager)
        return {
            managerId: manager.managerId,
            numOfEmployees,
            avgResolutionTime,
            avgResponseTime
        }
    }
}

ManagerService._dependencies = ['managerRepository'];

module.exports = ManagerService; 
