const validate = require('../../utils/validate')
const { NotFoundError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database 

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()
            const users = db.collection('users')
            const tasks = db.collection('tasks')

            return users.findOne( {_id: ObjectId(id)})
                .then(user => { 
                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    return tasks.find({ user: ObjectId(id) }).toArray()
                        .then(_tasks => {
                            _tasks.forEach( task => {
                                tasks.updateOne({_id: task._id}, { $set: { lastAccess: new Date } })
                                
                                task.id = task._id.toString() 
                                task.user = id
                                delete task._id
                                
                            })

                            return _tasks    
                                
                        })

                })
        })
}