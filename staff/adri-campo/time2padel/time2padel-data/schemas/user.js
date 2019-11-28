const { Schema, ObjectId } = require('mongoose')
const { validators: { isEmail } } = require('time2padel-util')
// const Team = require('./team')
// const Request = require('./request')

module.exports = new Schema({
    name: {
        type: String,
        // required: true
    },
    surname: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        // required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        // required: true
    },
    email: {
        type: String,
        // required: true,
        validate: isEmail,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    admin: {
        default: false
    },
    leagues: {
        type: [ObjectId],
        ref: 'League'
    },
    teams: {
        type: [ObjectId],
        ref: 'Team'
    }

    // request: Request
    
    // status: {
    //     type: String,
    //     enum: ['',''],
    //     default: 'ACTIVE'
    // }

})
//await User.create({name , surname, username, ... , teams:[], status})