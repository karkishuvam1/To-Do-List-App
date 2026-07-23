const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { message } = require('statuses');

const protect = async (req, res, next)=>{
    let token;
    // Check if the token exists
    if(req.headers.authorization && req.headers.authorizationstartsWith('Bearer'))
    {
        try{
            // Extract the token remove 'Bearer'
            token = req.headers.authorization.split(' ')[1];

            // Verify using the secret key from the .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user from decoded token id .select password remove the password

            req.user = await User.findById(decoded.id).select('-password');

            next();
        }catch(error){ //Token expires
            res.status(401).json({message: 'Not authorized, token failed' });
        }
    }
    // If no token found in the header
    if(!token) {
        res.status(401).json({message: 'Not authorized, no token' });
    }
};

module.exports = {protect};

