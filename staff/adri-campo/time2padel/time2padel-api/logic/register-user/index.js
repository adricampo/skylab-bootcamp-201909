const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { User } } = require('time2padel-data')


module.exports = function (name, surname, email, username, password, gender) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(gender)
    validate.string.notVoid('gender', gender)

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ name, surname, email, username, password, gender })
    })()
}