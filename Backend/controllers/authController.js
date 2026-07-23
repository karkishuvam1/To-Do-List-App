const { message } = require('statuses');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Registering the user
const registerUser = async (req, res)=>{
    const {name, email, password} = req.body;

    try{
        if (!name || !email|| !password){
            return res.status(400).json({message: 'Please fill all fields'});
        }

        const userExists = await User.findOne({email});

        if (userExists){
            return res.status(400).json({message: 'Email is already registered'});
        }
        // Creating the user
        const user = await User.create({name, email, password});

        // Sending back user data and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

// Login
const loginUser = async(req, res)=>{
    const {email, password} = req.body;

    try{
        if (!email || !password){
            return res.status(400).json({message: 'Please enter the email and password'});
        }
        // Find user by email
        const user = await User.findOne({email});

        // If user not found
        if(!user){
            return res.status(401).json({message:'Invalid email or password'});
        }
        // Check password using matchpassword from the User.js
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        };
        // Sendind user data and the token
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

// Get Me
// Returns the logged in user's profile
const getMe = async(req,res)=>{
    try{
        //req.user is set by authMiddleware
        const user = await User.findById(req.user._id).select('-password');

        res.status(200).json(user);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};
module.exports = {registerUser, loginUser, getMe};