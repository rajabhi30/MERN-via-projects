const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token.");
        }
        req.user = decoded;
        next();
    });
};

module.exports = isLoggedIn;