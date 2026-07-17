const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    color: {
        type: String,
        default: '#C0392B'
    },
    // Reference to the user who create this category
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
module.exports = mongoose.model('Category',CategorySchema);