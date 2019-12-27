const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
        default: uuidv4(),
    },
    role: {
        type: String,
        default: 'USER',
        required: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
