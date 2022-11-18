const { handleServerErrorResponse, handleNotFoundResponse, generateAccessToken, generateRefreshToken, verifyAccessToken, decodeAccessToken } = require("../helpers");
const { User } = require("../models");

const register = async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }).catch(error => handleServerErrorResponse(res, error));
    res.status(201).json(user.toJSON());
}

const login = async (req, res) => {
    const user = await User.authenticate(req.body.username, req.body.password).catch(error => handleServerErrorResponse(res, error));
    if(user) {
        user.refreshToken = generateRefreshToken();
        user.save();
        res.status(200).json({
            accessToken: generateAccessToken(user),
            refreshToken: user.refreshToken
        });
    }
    else res.status(400).json({
        message: "Authentication failed"
    });
}

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful'
    });
}

const refresh = async (req, res) => {
    const payload = await decodeAccessToken(req.body.accessToken);
    const user = await User.findOne({
        where: {
            id: payload.id,
            refreshToken: req.body.refreshToken
        }
    }).catch(error => handleServerErrorResponse(res, error));
    if(!user) handleNotFoundResponse(res);
    user.refreshToken = generateRefreshToken();
    user.save();
    res.status(200).json({
        accessToken: generateAccessToken(user),
        refreshToken: user.refreshToken
    });
}

module.exports = {
    register: register,
    login: login,
    logout: logout,
    refresh: refresh,
}