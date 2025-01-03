const jwt = require('jsonwebtoken');
const configJSON = require('../config.json');
const JWT_SECRET = configJSON.jwtSecret;

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
        return res.status(403).json({ error: 'A token is required for authentication' });
        }
    
        try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }
    
        return next();
    }
}