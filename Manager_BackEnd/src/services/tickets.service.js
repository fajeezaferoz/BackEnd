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

    async getTicketCountByStatusForManager(id){
        return await this.ticketRepository.getTicketCountByStatusForManager({managerId: id});
    };

    async getMangerSpecifiedTicket(id, managerId, ticketId){
        return await this.ticketRepository.getTicketsForManagerByStatus({ticketStatus: id, managerId, ticketId });
    };

    async getTicketCountByEmployeeForManager(id){
        return await this.ticketRepository.getTicketCountByEmployeeForManager({managerId: id});
    }
}

TicketService._dependencies = ['ticketRepository'];

module.exports = TicketService;