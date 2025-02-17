const { injector } = require('ca-webutils');

const ticketController = () => {
    const ticketService = injector.getService('ticketService');

    const getAllTickets = async () => {
        return await ticketService.getAllTickets();
    };

    const getTicketById = async ({ id }) => {
        return await ticketService.getTicketById(id);
    };

    const addTicket = async ({ body }) => {
        return await ticketService.createTicket(body);
    };

    const updateTicket = async ({ body, id }) => {
        return await ticketService.updateTicket(id, body);
    };

    const deleteTicket = async ({ id }) => {
        return await ticketService.deleteTicket(id);
    };

    const getTicketCountByStatusForManager = async ({ id }) => {
        return await ticketService.getTicketCountByStatusForManager(id);
    };

    const getMangerSpecifiedTicket = async ({ id, managerId, ticketId }) => {
        return await ticketService.getMangerSpecifiedTicket(id.toUpperCase(), managerId, ticketId);
    };

    const getTicketCountByEmployeeForManager = async ({id}) => {
        return await ticketService.getTicketCountByEmployeeForManager(id);
    };

    return {
        getAllTickets,
        getTicketById,
        addTicket,
        updateTicket,
        deleteTicket,
        getTicketCountByStatusForManager,
        getMangerSpecifiedTicket,
        getTicketCountByEmployeeForManager,
    };
};

module.exports = ticketController;
