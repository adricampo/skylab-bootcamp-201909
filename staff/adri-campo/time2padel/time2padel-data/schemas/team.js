const { Schema, ObjectId } = require('mongoose')
const Request = require('./request')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    players: [{
        type: ObjectId,
        required: true,
        ref: 'User'
    }],
    wins: {
        type: String,
        required: false,
        default: 0
    },
    loses: {
        type: String,
        required: false,
        default: 0
    },

    request: Request

})