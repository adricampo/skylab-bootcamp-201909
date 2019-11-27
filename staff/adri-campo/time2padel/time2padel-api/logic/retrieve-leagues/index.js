const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

module.exports = function () {
    return (async () => {
        const leagues = await League.find().lean()

        if (!leagues) throw new NotFoundError(`no leagues on that moment`)

        // const { level, gender, numberOfTeams, date, time } = league.toObject()

        // const leagues = await League.find({ user: id }, { __v: 0 }).lean()
        
        return leagues
    })()
}
