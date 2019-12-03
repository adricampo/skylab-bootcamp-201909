const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')

module.exports = function (name, surname, username, gender, email, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(gender)
    validate.string.notVoid('gender', gender)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, username, gender, email, password: hash })
    })()
}