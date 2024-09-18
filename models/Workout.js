const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    name: {
        type: String,
        required: [true, 'Name is required']
    }, 

    duration: {
        type: String,
        required: [true, 'Duration is required']
    },

    dateAdded: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pending', 'completed'], // You can add more statuses if needed
        default: 'pending'
    }
})

module.exports = mongoose.model('Workouts', workoutSchema);