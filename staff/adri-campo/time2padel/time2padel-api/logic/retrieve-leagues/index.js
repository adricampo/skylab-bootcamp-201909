const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

module.exports = function () {
    return (async () => {
        const leagues = await League.find().lean()
        if (!leagues) throw new NotFoundError(`no leagues on that moment`)

        return leagues
    })()
}
