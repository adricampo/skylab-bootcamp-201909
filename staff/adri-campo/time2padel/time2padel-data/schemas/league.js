const { Schema } = require('mongoose')
const Team = require('./team')

module.exports = new Schema({
    level: {
        type: String,
        enum: ['D', 'C-', 'C+', 'B-', 'B+', 'A'],
        required: true

    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    teams: {
        type: [Team]
    },
    numberOfTeams: {
        type: Number,
        default: 6
    }
})

