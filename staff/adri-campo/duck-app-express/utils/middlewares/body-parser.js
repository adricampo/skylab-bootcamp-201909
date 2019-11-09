const { parseBody } = require('../parsers')

module.exports = function (require, response, next) {
    parseBody(require, body => {
        require.body = body

        next()
    })
}