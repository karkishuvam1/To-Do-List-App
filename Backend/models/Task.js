const mongoose = require('Mongoose');
const { applyTimestamps } = require('./User');

const TaskSchema = new mongoose.Schema({
    // Task Title
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    priority:{
        type: String,
        enum: ['low','medium','high'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending','in-progress','completed'],
        default:'pending'
    },
    dueDate: {
        type: Date
    },
    time: {
        type: String,
        default: ''
    },
    // Progress in percentage
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    // Reference to the user who owns this task
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', TaskSchema);