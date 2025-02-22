const axios = require('axios');
const https = require('https');
const bcrypt = require('bcrypt');


const httpsAgent = new https.Agent({
    rejectUnauthorized: false, 
});

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
        try {
            const response = await axios.post(`https://localhost:7000/api/managers`, manager, {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async updateManager(id, managerData, mrgId) {
        try {
            const manager = await this.getManagerById(mrgId)
            if (!manager) 
                throw new Error('Manager not found');
            const emailData = {
                subject: "Your Details As been Updated",
                htmlVal: `
                <p>Dear Employee,</p>
                <p>Your profile has been updated by admin</p>
                <p>Regards</p>
                <p>CodeCrafters</p>
                `,
                to: employee.email
            }
            if(managerData.password)
                managerData.password = await bcrypt.hash(managerData.password, 10);
            await axios.post(`https://localhost:7000/api/email`, emailData, {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await this.managerRepository.update({ managerId: mrgId }, managerData);
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async deleteManager(id) {
        try {
            const manager = await this.getManagerById(id)
            if (!manager)
                throw new Error('Manager not found');
            const emailData = {
                subject: "Your Account Has Been Deleted",
                htmlVal: `
                <p>Dear Employee,</p>
                <p>Your account has been deleted by admin</p>
                <p>Regards</p>
                <p>CodeCrafters</p>
                `,
                to: manager.email
            }
            await axios.post(`https://localhost:7000/api/email`, emailData, {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return await this.managerRepository.deleteData({ managerId: id });
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

ManagerService._dependencies = ['managerRepository'];

module.exports = ManagerService; 
