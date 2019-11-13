const validate = require('../../utils/validate')
const users = require('../../data/users.json')
const fs = require('fs')
const path = require('path')

module.exports = function(username, password){
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return new Promise((resolve,reject) => {
        users.push({ username, password })

        

        fs.writerFile(path.join(__dirname, '../../data/users.json'), JSON.stringify(users), error => error ? reject(error) : resolve())

    })

}

