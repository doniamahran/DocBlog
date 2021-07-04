const jwt = require('jsonwebtoken');
const config = require('config');


// middleware func
module.exports = function (req, res, next) {

    // Get token from header
    const token = req.header('x-auth-token');

    // Chkeck if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token !' })
    }

    //Verify token
    try {
        const bcrypt = require('bcryptjs');
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token id NOT Valid' }) // but there is a token
    }
}