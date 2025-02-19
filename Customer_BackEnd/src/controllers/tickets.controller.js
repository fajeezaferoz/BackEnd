const { injector } = require('ca-webutils');

const ticketController = () => {
    const ticketService = injector.getService('ticketService');

    const getAllTickets = async () => {
        return await ticketService.getAllTickets();
    };

    const getTicketById = async ({ id }) => {
        return await ticketService.getTicketById(id);
    };

    const addTicket = async ({ id, body, request }) => {
        const token = request.headers['authorization']?.split(' ')[1]
        if(id){
            body={...body, customerId: id};
        }
        return await ticketService.createTicket(body, token);
    };

    const updateTicket = async ({ body, id }) => {
        return await ticketService.updateTicket(id, body);
    };

    const deleteTicket = async ({ id }) => {
        return await ticketService.deleteTicket(id);
    };

    const getTicketByCustId = async ({ id }) => {
        return await ticketService.getTicketByCustId(id);
    };

    return {
        getAllTickets,
        getTicketById,
        addTicket,
        updateTicket,
        deleteTicket,
        getTicketByCustId,
    };
};

module.exports = ticketController;
