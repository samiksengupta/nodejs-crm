const { handleUnauthorizedResponse, handleNotFoundResponse, handleServerErrorResponse, generateAccessToken, generateRefreshToken, verifyAccessToken, decodeAccessToken } = require("../helpers");
const { User } = require("../models");

const register = async (req, res) => {
    let user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role || undefined,
        isEnabled: req.body.isEnabled || undefined
    }).catch(error => handleServerErrorResponse(res, error));
    if(user) res.status(201).json(user);
}

const login = async (req, res) => {
    const user = await User.authenticate(req.body.username, req.body.password).catch(error => handleUnauthorizedResponse(res));
    if(user) {
        user.refreshToken = generateRefreshToken();
        user.save();
        res.status(200).json({
            accessToken: generateAccessToken(user),
            refreshToken: user.refreshToken
        });
    }
}

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful'
    });
}

const refresh = async (req, res) => {
    const payload = await decodeAccessToken(req.body.accessToken);
    const user = await User.findOne({
        id: payload.id,
        refreshToken: req.body.refreshToken
    }).catch(error => handleServerErrorResponse(res, error));
    if(user) {
        user.refreshToken = generateRefreshToken();
        user.save();
        res.status(200).json({
            accessToken: generateAccessToken(user),
            refreshToken: user.refreshToken
        });
    }
    else handleNotFoundResponse(res);
}

module.exports = {
    register: register,
    login: login,
    logout: logout,
    refresh: refresh,
}