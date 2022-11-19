const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Ticket, User } = require("../models");

const index = (req, res) => {
    Ticket.find().then(items => {
        res.status(200).json(items);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    if(!(await User.hasEngineers())) return handleServerErrorResponse(res, { message: "There are no engineers to assign tickets to" });
    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        raisedByUser: req.body.raisedByUser || undefined,
        assignedToUser: req.body.assignedToUser || undefined
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    Ticket.findById(req.params.id).then(data => {
        if(data) {
            res.status(200).json(data);
            res.end();
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    Ticket.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.title) data.title = req.body.title;
            if(req.body.description) data.description = req.body.description;
            if(req.body.priority) data.priority = req.body.priority;
            if(req.body.status) data.status = req.body.status;
            if(req.body.raisedByUser) data.raisedByUser = req.body.raisedByUser;
            if(req.body.assignedToUser) data.assignedToUser = req.body.assignedToUser;
            if(data.isModified()) {
                data.save().then(data => {
                    res.status(200).json(data);
                    res.end();
                }).catch(error => {
                    handleServerErrorResponse(res, error);
                });
            }
            else {
                res.status(200).json(data);
                res.end();
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    if(req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannt delete Self');
    Ticket.findById(req.params.id).then(data => {
        if(data) {
            data.deleteOne({ _id: req.params.id }).then(data => {
                res.status(200).json(data);
                res.end();
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}