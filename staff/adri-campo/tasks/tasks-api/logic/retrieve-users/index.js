const validate = require('../../utils/validate')
const users = require('../../data/users')()
const { NotFoundError } = require('../../utils/errors')

module.exports = function () {

    return new Promise((resolve, reject) => { debugger
        const user = users.data

        users.persist().then(() => {
        
            resolve(user)
        })
    })
} 