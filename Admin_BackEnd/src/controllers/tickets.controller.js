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

    const getTicketCountByState = async () => {
        return await ticketService.getTicketCountByState();
    }

    const getTicketCountByCity = async () => {
        return await ticketService.getTicketCountByCity();
    }

    const getTicketCountByDomain = async () => {
        return await ticketService.getTicketCountByDomain();
    }

    const getTicketCountByLatAndLog = async () => {
        return await ticketService.getTicketCountByLatAndLog()
    }

    return {
        getAllTickets,
        getTicketById,
        addTicket,
        updateTicket,
        deleteTicket,
        getTicketCountByState,
        getTicketCountByCity,
        getTicketCountByDomain,
        getTicketCountByLatAndLog,
    };
};

module.exports = ticketController;
