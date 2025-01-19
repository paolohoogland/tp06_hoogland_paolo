const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HELLOHELLOHELLO';

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            res.status(401).json({ message: 'Authentication token missing.' });
        }
        else {
            try {
                let jwtBearer = token.split(' ')[1];
                const decoded = jwt.verify(jwtBearer, SECRET_KEY);
                req.user = decoded;

            } catch (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
        }

        next();
    }
}