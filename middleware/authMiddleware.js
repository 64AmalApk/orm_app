// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

function verifyToken(role) {
    return function (req, res, next) {
        // const token = req.headers['authorization'];
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null;
        if (!token) {
            return res.status(403).json({ error: 'No token provided' });
        }
        console.log(token, secretKey)
        jwt.verify(token, secretKey, (err, decoded) => {
            console.log(err)
            if (err) {
                return res.status(401).json({ error: 'Failed to authenticate token' });
            }
            if (role && decoded.role !== role) {
                return res.status(403).json({ error: 'Access denied' });
            }
            req.userId = decoded.id;
            next();
        });
    };
}

module.exports = verifyToken;
