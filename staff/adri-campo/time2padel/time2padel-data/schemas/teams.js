const { Schema, ObjectId } = require('mongoose')
const Request = require('./request')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    user1: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    user2: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    request: Request

})