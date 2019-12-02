const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { models: { League } } = require('time2padel-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {
        const league = await League.findById(id)
        if (!league) throw new NotFoundError(`League ${id} not found`)
        await league.save()

        const { level, gender, date, time, teams, status, playingDays, startDate } = league.toObject()
        return { id, level, gender, date, time, teams, status, playingDays, startDate }
    })()
}