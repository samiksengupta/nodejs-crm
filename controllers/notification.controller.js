const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Notification, Ticket } = require("../models");

const indexByTicket = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid Ticket ID');
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) handleNotFoundResponse(res, 'Ticket not found');
    Notification.find({
        ticketId: ticket.id
    }).then(items => {
        res.status(200).json(items);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    Notification.create({
        subject: req.body.subject,
        body: req.body.body,
        emails: req.body.emails,
        ticketId: req.body.ticketId,
        userId: req.user.id,
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    indexByTicket: indexByTicket,
    create: create,
}