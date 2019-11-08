module.exports = function (require) {
    const { headers: { cookie } } = require

    const cookies = {}

    const keyValues = cookie.split(';')

    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.trim().split('=')

        cookies[key] = value
    })

    return cookies
}