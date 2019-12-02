const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {
        const league = await League.findById(id)
        if (!league) throw new NotFoundError(`league ${id} not found`)
        await league.save()
        
        const { teams } = league.toObject()
        return { teams }
    
    })()
}