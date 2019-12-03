const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { Team } } = require('time2padel-data')

module.exports = function (id) {
    validate.string(id, 'id')
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    
    return (async () => {
        const team = await Team.findById(id)

        if (!team) throw new NotFoundError(`team with id ${id} does not exist`)

        await Team.deleteOne({ _id: id })

})()
}