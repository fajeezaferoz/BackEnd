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
const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVc2VyQXV0aGVudGljYXRvciIsImlhdCI6MTczOTYwMjk4NywiZXhwIjoxNzM5NjA2NTg3LCJjbGFpbXMiOnsibmFtZSI6IlByYW5hdGhpIiwiZW1haWwiOiJwcmFuYUBleGFtcGxlLmNvbSIsInJvbGVzIjpbImN1c3RvbWVyIl19fQ.Cv_ZICYp_neHZOG_dqPdE4BAzvzK_OQUz_VelDOsqWsqHuzM9yCYkXhSwdwT3dU9n63RONdNprH19meJ9HFDQPOPG2_e7OpR0im7goU7pe6CvteMsfHaYGFLyIi5a7qQmIZPdEKXB0H93vD7Bnb77XPFUcgN5xa1fqRVggN5Zkn8PF7D7Nxyc0vygU8ErV-QRNTrUzGh-DDERdeLpztxOFJGw1H0KP5h_x47gwzWWULrUWpW37INLwuawnrIVXgYQPsLQ5vYquXrOtmS7u9BuwGJ6tW6tHJ3SZuCsfOfbcmFLiNfEBkIYTSQyU51pc5NEzAHDZDm2B2_6TRkNfdh3Q"
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
