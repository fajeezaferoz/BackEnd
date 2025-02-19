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
        const ticket = await this.ticketRepository.findOne({ ticketId: id });
        if (!ticket) throw new Error('Ticket not found');
    
        const validTransitions = {
            OPEN: 'PENDING',
            PENDING: 'CLOSED'
        };
    
        if (ticketData.ticketStatus && ticketData.ticketStatus !== validTransitions[ticket.ticketStatus]) {
            throw new Error(`Invalid status transition from ${ticket.ticketStatus} to ${ticketData.ticketStatus}`);
        }
    
        if (ticketData.ticketStatus && ticket.ticketStatus !== ticketData.ticketStatus) {
            ticketData.ticketStatusHistory = [
                ...(ticket.ticketStatusHistory || []),
                { status: ticketData.ticketStatus, changedAt: new Date() }
            ];
        }
    
        return this.ticketRepository.update({ ticketId: id }, ticketData);
    }
    

    async deleteTicket(id) {
        return await this.ticketRepository.remove({ ticketId: id });
    }

    async getTicketByEmpId(id){
        return await this.ticketRepository.getTicketByEmpId({employeeId: id});
    }
}

TicketService._dependencies = ['ticketRepository'];

module.exports = TicketService;