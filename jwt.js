const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: 'Token not found' });
    }

    //extract jwt token from the request header
    const token = req.headers['authorization']?.split(' ')[1]; // get the token from the authorization header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err) {
        console.error(err);
        res.status(401).json({error: 'invalid token'});

    }
}

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });

}
module.exports = {jwtAuthMiddleware, generateToken};