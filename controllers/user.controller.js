const { isObjectId, handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { User } = require("../models");

const index = (req, res) => {
    User.find().then(items => {
        res.status(200).json(items);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role || undefined,
        isEnabled: req.body.isEnabled || undefined
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    User.findById(req.params.id).then(data => {
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
    User.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.name) data.name = req.body.name;
            if(req.body.username) data.username = req.body.username;
            if(req.body.password) data.password = req.body.password;
            if(req.body.email) data.email = req.body.email;
            if(req.body.role) data.role = req.body.role;
            if(req.body.isEnabled) data.isEnabled = req.body.isEnabled;
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
    User.findById(req.params.id).then(data => {
        if(data) {
            data.destroy().then(data => {
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