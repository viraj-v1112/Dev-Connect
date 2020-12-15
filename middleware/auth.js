const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {

    // Get JWT token from the header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try{

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Get the user related to the token. This user then can be used to get the user profile in future.
        // Sample of decoded
        // {
        //     user: { id: '5fc7a208e1aba83a6c8682f5' },
        //     iat: 1606918664,
        //     exp: 1607278664
        // }

        req.user = decoded.user;
        next()

    } catch(err) {
        return res.status(401).json({ msg: "Token is not valid" })
    }

}