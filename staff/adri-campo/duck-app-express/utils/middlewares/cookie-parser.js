const { parseCookie } = require('../parsers')

module.exports = function (require, response, next) {
    require.cookies = parseCookie(require)

    next()
}