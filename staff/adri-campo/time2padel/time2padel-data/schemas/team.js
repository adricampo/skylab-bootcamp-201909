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
    
    request: Request

})