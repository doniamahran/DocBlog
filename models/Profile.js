const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    specialization: {
        type: String,
        required: true
    },
    hospital: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    certificate: {
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Profile = mongoose.model('profile', ProfileSchema)