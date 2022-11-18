const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
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
        password: req.body.password
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = (req, res) => {
    User.findByPk(req.params.id).then(data => {
        if(data) {
            res.status(200).json(data);
            res.end();
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = (req, res) => {
    User.findByPk(req.params.id).then(data => {
        if(data) {
            data.name = req.body.name,
            data.username = req.body.username,
            data.password = req.body.password,
            data.save().then(data => {
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

const destroy = (req, res) => {
    User.findByPk(req.params.id).then(data => {
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