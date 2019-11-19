const { Schema, ObjectId } = require('mongoose')

module.exports =  new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
     
    },
    status: {
        type: String,
        required: true,
        unique: true
    }
})