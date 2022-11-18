const { verifyAccessToken } = require("../helpers");

module.exports = {
    authenticate: async (req, res, next) => {
        const authorization = req.header('Authorization') || '';
        const token = authorization.split(' ')[1];
        if(!token) {
            res.status(401).send({ message: 'Token not found' });
            return;
        }
        const payload = await verifyAccessToken(token);
        if(payload) {
            req.user = payload;
            next();
        }
        else {
            res.status(403).send({ message: 'Token invalid or expired' });
            return;
        }
    },

    authorize: async (req, res, next) => {
        if(req.user && req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).send({ message: 'Permission not granted' });
            return;
        }
    }
}