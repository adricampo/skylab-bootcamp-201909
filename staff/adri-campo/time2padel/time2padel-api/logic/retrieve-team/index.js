const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { Team } } = require('time2padel-data')

module.exports = function (title) {
    validate.string(title)
    validate.string.notVoid('title', title)

    return (async () => {
        const team = await Team.findOne({title})
        if (!team) throw new NotFoundError(`Team ${team.title} not found`)
        await team.save()

        const { id, title: _title, player1, player2, wins, loses, status, leagues } = team
        return { id, title: _title, player1, player2, wins, loses, status, leagues }
    })()
}