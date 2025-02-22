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
        return await this.ticketRepository.create(ticket);
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

    async convertLatAndLogToState(lat, lon) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            return data.address?.state || null;
        } catch (error) {
            console.error('Error converting coordinates to state:', error);
            return null;
        }
    }
    
    async convertLatAndLogToCity(lat, lon) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            return data.address?.state_district || null;
        } catch (error) {
            console.error('Error converting coordinates to city:', error);
            return null;
        }
    }
    
    async getTicketCountByState() {
        let stateWithNumberOfTickets = {};
        const tickets = await this.getAllTickets();
        
        if (!tickets || tickets.length === 0) {
            throw new Error('No tickets found');
        }
    
        const statePromises = tickets
            .filter(ticket => ticket.latitude && ticket.longitude)
            .map(async (ticket) => {
                const state = await this.convertLatAndLogToState(ticket.latitude, ticket.longitude);
                return state;
            });
    
        const states = await Promise.all(statePromises);
    
        states.forEach(state => {
            if (state) {
                stateWithNumberOfTickets[state] = (stateWithNumberOfTickets[state] || 0) + 1;
            }
        });
    
        return stateWithNumberOfTickets;
    }
    
    async getTicketCountByCity() {
        let cityWithNumberOfTickets = {};
        const tickets = await this.getAllTickets();
        
        if (!tickets || tickets.length === 0) {
            throw new Error('No tickets found');
        }
    
        const cityPromises = tickets
            .filter(ticket => ticket.latitude && ticket.longitude)
            .map(async (ticket) => {
                const city = await this.convertLatAndLogToCity(ticket.latitude, ticket.longitude);
                return city;
            });
    
        const cities = await Promise.all(cityPromises);
    
        cities.forEach(city => {
            if (city) {
                cityWithNumberOfTickets[city] = (cityWithNumberOfTickets[city] || 0) + 1;
            }
        });
    
        return cityWithNumberOfTickets;
    }

    async getTicketCountByDomain(){
        let domainWithNumberOfTickets = {};
        const tickets = await this.getAllTickets();
        
        if (!tickets || tickets.length === 0) {
            throw new Error('No tickets found');
        }

        tickets.forEach(ticket => {
            if(domainWithNumberOfTickets[ticket.department]){
                domainWithNumberOfTickets[ticket.department]++;
            }else{
                domainWithNumberOfTickets[ticket.department] = 1;
            }
        })
        return domainWithNumberOfTickets;
    }

    async getTicketCountByLatAndLog(){
        let ticketCountByLatAndLog = {};
        const tickets = await this.getAllTickets();
        
        if (!tickets || tickets.length === 0) {
            throw new Error('No tickets found');
        }

        tickets.forEach(ticket => {
            if(ticket.latitude && ticket.longitude){
                const key = `${ticket.latitude}_${ticket.longitude}`;
                if(ticketCountByLatAndLog[key]){
                    ticketCountByLatAndLog[key]++;
                } else{
                    ticketCountByLatAndLog[key] = 1;
                }
            }
        })
        return ticketCountByLatAndLog;
    }

}

TicketService._dependencies = ['ticketRepository'];

module.exports = TicketService;