const { Schema } = require('mongoose')
const Team = require('./teams')

module.exports = new Schema({
    level: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    teams: [Team]
})
