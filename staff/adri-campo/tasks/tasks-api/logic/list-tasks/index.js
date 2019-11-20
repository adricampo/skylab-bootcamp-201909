const validate = require('../../utils/validate')
const { ObjectId, models: { User, Task } } = require('../../data')
const { NotFoundError, ContentError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return User.findById(id)
        .then(user => { 
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            return Task.find({ user: id }).lean()
                .then(tasks => {
                    tasks.forEach(task => {
                        tasks.updateOne({ _id: task._id }, { $set: { lastAccess: new Date } })

                        task.id = task._id.toString()
                        task.user = id
                        delete task._id

                    })
                    return tasks
                })
        })
}