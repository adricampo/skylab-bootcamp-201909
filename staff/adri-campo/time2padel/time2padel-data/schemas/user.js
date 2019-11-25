const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('time2padel-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})