const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Consider enabling this in production
});

// Function to validate JWT
function isTokenValid(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            console.error("Invalid JWT: Missing expiration claim.");
            return false;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            console.error("JWT Token expired at:", new Date(decoded.exp * 1000));
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error decoding JWT:", error.message);
        return false;
    }
}

// Replace this with a valid token from your authentication system
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVc2VyQXV0aGVudGljYXRvciIsImlhdCI6MTczOTk0MDA1OCwiZXhwIjoxNzM5OTQzNjU4LCJjbGFpbXMiOnsibmFtZSI6IlByYW5hdGhpIiwiZW1haWwiOiJwcmFuYUBleGFtcGxlLmNvbSIsInJvbGVzIjpbImN1c3RvbWVyIl0sInVzZXJOYW1lIjoicHJhbmEifX0.Exp8KTe4DPom_EpUh4RXQ9giOau5H-R6_yt5Jug7wO7Bp7KKKKNZFBReAOz6VYdeCaVLlB49vRb2iPFoxrc50YCL_W7b0OW-SzN0CUBvk1n2yjSosYeVzREGPDai8fyp2UGn-CcTfh86mGXgsqVZDMdRzx-o4qIUUdtUsdu_-UIn4ipMVDADz-DYbck6naHm4l2S2lcrlYjCOm-Y89Z511cajdgdolJMgc_PDFDXT9vWIy_txMLsz7vDF_whGcjMk0HHFkcXsvtFQvTMAJKJPq1m4NmQsluP3obbK0tFB_T2eOtryqHCLu-L_HPhgmzS0iTEz6eKMlIlMWLDqryxdQ"

// Validate the JWT token before making any API requests


const headers = {
    Authorization: `BEARER ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

class TicketService {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async getAllTickets() {
        return await this.ticketRepository.getAll();
    }

    async getTicketById(id) {
        return await this.ticketRepository.findOne({ ticketId: id });
    }

    async createTicket(ticket) { 
        try {
            const allManagers = await axios.get('https://localhost:5000/api/managers', { httpsAgent, headers });
            const manager = allManagers.data.find(manager => manager.department === ticket.department);
            if (!manager) {
                throw new Error('No manager found in the specified department');
            }
            const employeeTicketCount = await axios.get(
                `https://localhost:5000/api/managers/${manager.managerId}/collegue/ticketCount`,
                { httpsAgent, headers }
            );

            if (!employeeTicketCount.data.length) {
                throw new Error('No employees found to assign the ticket');
            }
            employeeTicketCount.data.sort((a, b) => a.ticketCount - b.ticketCount);
            ticket.employeeId = employeeTicketCount.data[0]._id;
            return await this.ticketRepository.create(ticket);
        } catch (error) {
            throw error;
        }
    }

    async updateTicket(id, ticketData) {
        const ticket = await this.ticketRepository.findOne({ticketId: id})
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        if(ticketData.ticketStatus && ticket.ticketStatus!==ticketData.ticketStatus) 
            ticketData.ticketStatusHistory=ticket.ticketStatusHistory.concat({ status: ticketData.ticketStatus, changedAt: new Date() });
        return await this.ticketRepository.update({ ticketId: id }, ticketData);
    }

    async deleteTicket(id) {
        return await this.ticketRepository.remove({ ticketId: id });
    }

    async getTicketByCustId(id) {
        return await this.ticketRepository.getTicketByCustId({ customerId: id });
    }
}

TicketService._dependencies = ['ticketRepository'];

module.exports = TicketService;
