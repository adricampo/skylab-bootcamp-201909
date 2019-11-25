const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    solicitations: {
        type: Boolean,
        default: false,
        required: true
    }
})
