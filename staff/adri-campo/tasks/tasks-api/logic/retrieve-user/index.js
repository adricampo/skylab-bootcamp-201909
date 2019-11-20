const validate = require('../../utils/validate')
const { ObjectId, models: { User } } = require('../../data')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        let user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.lastAccess = new Date

        await user.save()
    
        user = user.toObject()
        
        user.id = user._id.toString()

        delete user._id
        delete user.password

        return user

    })()
}