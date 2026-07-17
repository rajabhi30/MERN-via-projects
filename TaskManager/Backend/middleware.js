const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    let token = req.cookies?.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }
    jwt.verify(token, 'secret key', (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token.");
        }
        req.user = decoded;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("Access denied. Not an admin.");
    }
    next();
};

module.exports = { isLoggedIn, isAdmin };