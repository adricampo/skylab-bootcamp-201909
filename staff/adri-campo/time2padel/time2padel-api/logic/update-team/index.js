const { validate, errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { models: { Team } } = require('time2padel-data')

// Update Team

module.exports = function (id, answer) {
    validate.string(id)
    validate.string.notVoid('id', id)

    validate.string(answer)
    validate.string.notVoid('answer', answer)

    return (async () => {
        const team = await Team.findById(id)
        if (!team) throw new NotFoundError(`team ${team.title} not exists`)

        if (team.status === 'PENDING') {
            let status 
            answer ? status = 'ACCEPTED' :  status = 'DENNIED' 
            team.status = status
            
        } else {
            throw new ConflictError(`this team ${team.title} has already been accepted or dennied`)
        }
        await team.save() 
        return team.status
    })()
}