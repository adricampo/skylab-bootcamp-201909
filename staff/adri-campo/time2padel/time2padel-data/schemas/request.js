const { Schema, ObjectId } = require('mongoose')
const League = require('./league')

module.exports = new Schema({
    emisor: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    receptor: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    league: League,

    status: {
        type: Boolean,
        default: false,
        required: false
    }
})
