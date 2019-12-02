const { Schema, ObjectId } = require('mongoose')
const { validators: { isEmail } } = require('time2padel-util')
// const Team = require('./team')
// const Request = require('./request')

module.exports = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        default: 'MALE'
    },
    email: {
        type: String,
        validate: isEmail
    },
    password: {
        type: String,
    },
    // admin: {
    //     default: false
    // },
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