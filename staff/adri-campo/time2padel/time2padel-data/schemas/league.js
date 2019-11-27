const { Schema } = require('mongoose')
const Team = require('./team')

module.exports = new Schema({
    level: {
        type: String,
        enum: ['D', 'C-', 'C+', 'B-', 'B+', 'A'],
        // required: true

    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        // required: true
    },
    date: {
        type: String,
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
        // required: true
    },
    time: {
        type: String,
        enum: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
        // required: true
    },
    teams: {
        type: [Team]
    },
    numberOfTeams: {
        type: Number,
        default: 6
    }
})

