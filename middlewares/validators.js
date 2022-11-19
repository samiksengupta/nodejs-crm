const { check, validationResult } = require('express-validator');
const { User } = require("../models");

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
}

module.exports = {
    authRegister: [
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('username').trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail().custom(value => {
            return User.findOne({ username: value }).then(user => { if(user) return Promise.reject('Username is already taken')} );
        }),
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().custom(value => {
            return User.findOne({ email: value }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        handleValidation
    ],
    authLogin: [
        check('username').trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail(),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail(),
        handleValidation
    ],
    authRefresh: [
        check('accessToken').trim().escape().not().isEmpty().withMessage('Access token cannot be empty').bail(),
        check('refreshToken').trim().escape().not().isEmpty().withMessage('Refresh token cannot be empty').bail(),
        handleValidation
    ],
    userCreate: [
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('username').trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail().custom(value => {
            return User.findOne({ username: value }).then(user => { if(user) return Promise.reject('Username is already taken')} );
        }),
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().custom(value => {
            return User.findOne({ email: value }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        handleValidation
    ],
    userUpdate: [
        check('name').optional().trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('username').optional().trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail().custom((value, { req }) => {
            return User.findOne({ username: value, _id: { $ne: req.params.id }}).then(user => { if(user) return Promise.reject('Username is already taken')} );
        }),
        check('email').optional().trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().custom((value, { req }) => {
            return User.findOne({ email: value, _id: { $ne: req.params.id } }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').optional().trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        handleValidation
    ]
}