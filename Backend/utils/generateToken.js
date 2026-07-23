const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sigh(
        {id}, //stores the user id inside token
        process.env.JWT_SECRET,
        {expiresIn: procress.env.JWT_EXPIRE}
    );
};

module.exports = generateToken;
