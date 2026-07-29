const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') }); //Load .env variables

// Importing the routes
const authRoutes = require('./routes/authRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const taskRoutes = require('./routes/taskRoutes');

// Creating the express app
const app = express();


// app.use('/api/categories', categoryRoutes);
// app.use('/api/tasks', taskRoutes);
//Allows frontend to talk to the backend
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

//Parse the url encoded form data
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
//Useful for testing if server is running
app.get('/', (req,res)=>{
    res.json({message:'DoIt API is running'});
});

// Stating the server

const PORT = process.env.PORT || 4000;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
});


