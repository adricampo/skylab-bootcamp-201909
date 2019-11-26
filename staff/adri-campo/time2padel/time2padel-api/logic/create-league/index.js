const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { League } } = require('time2padel-data')

module.exports = function (level, gender, numberOfTeams, date, time) {
    validate.string(level)
    validate.string.notVoid('level', level)

    validate.string(gender)
    validate.string.notVoid('gender', gender)

    if (numberOfTeams) {    
        validate.number(numberOfTeams)
    } 

    validate.string(date)
    validate.string.notVoid('date', date)

    validate.string(time)
    validate.string.notVoid('time', time)
    
    return (async () => {
        const league = await League.create({ level, gender, numberOfTeams, date, time })

        if (date && time) throw new ConflictError(`league with date ${date} + time ${time} already exists`)
        
        return league._id

    })()
}