const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { League } } = require('time2padel-data')
// const robin = require('roundrobin');

module.exports = function (level, gender, date, time) {
    validate.string(level)
    validate.string.notVoid('level', level)

    validate.string(gender)
    validate.string.notVoid('gender', gender)

    validate.string(date)
    validate.string.notVoid('date', date)

    validate.string(time)
    validate.string.notVoid('time', time)
    
    return (async () => {
        const league = await League.findOne({ level, gender, date, time })

        if (league) throw new ConflictError(`This league already exists`)

        await League.create({ level, gender, date, time })
        

        // debugger
        // let Schedule = robin(6, ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6']);
        // debugger
        // league.forEach(league => {
        //     id = league.id
        //     delete league._id
        //     delete league.__v
        // })

        // return league
    })()
}