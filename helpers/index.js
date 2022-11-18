const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const server = require("../config/server");

module.exports = {
    handleServerErrorResponse: (res, error) => {
        if(server.ENV === 'production') {
            res.status(500).send({
                message: 'A server error occured'
            });
            res.end();
        }
        else {
            console.log(error);
            res.status(500).send(error);
            res.end();
        }
    },
    
    handleNotFoundResponse: (res) => {
        res.status(404).json({
            message: 'Resource does not exist'
        });
        res.end();
    },

    hashPassword: async (raw) => {
        return await bcrypt.hash(raw, 10);
    },

    comparePassword: async (raw, hash) => {
        return await bcrypt.compare(raw, hash);
    },

    generateAccessToken: (user) => {
        const jitter = parseInt(Math.random() * 120);
        const lifespan = +server.JWT_LIFESPAN + jitter;
        return jwt.sign({ 
            id: user.id,
            isAdmin: user.isAdmin
        }, server.JWT_SECRET, {
            expiresIn: `${lifespan}s`
        });
    },

    verifyAccessToken: async (token) => {
        return await jwt.verify(token, server.JWT_SECRET, (err, payload) => {
            if(err) return false;
            return payload;
        });
    },

    decodeAccessToken: (token) => {
        return jwt.decode(token);
    },

    generateRefreshToken: (user) => {
        return require('crypto').randomBytes(32).toString('hex');
    },

    slugify: (string, appendTimestamp = false) => {
        const slug = string.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        if(appendTimestamp) {
            slug = `${slug}-${Date.now()}`;
        }
        return slug;
    },
};