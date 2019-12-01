const { validate, errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { models: { User, Team } } = require('time2padel-data')

// Create Team

module.exports = function (id, username, title) {
    validate.string(id)
    validate.string.notVoid('id', id)

    validate.string(username)
    validate.string.notVoid('username', username)

    validate.string(title)
    validate.string.notVoid('title', title)


    return (async () => {
            let player1 = await User.findById(id)
            if(!player1) throw new NotFoundError(`player1 with username ${username} does not exist`)
            const player1Id = player1._id

            let player2 = await User.findOne( { username } )
            if(player1 === player2) throw new ConflictError(`player ${player2} already exists`)
            if(!player2) throw new NotFoundError(`player2 with username ${username} does not exist`)
            const player2Id = player2._id
        
            const retrievedTeam = await Team.findOne({ title, player1: player1Id, player2: player2Id })
            if (retrievedTeam) throw new ConflictError(`Team ${retrievedTeam.title} already exists`)
            const team = await Team.create({ title, player1: player1Id, player2: player2Id, status: 'PENDING' }) 
            
            player1.teams.push(team)
            player2.teams.push(team)
            await player1.save()
            await player2.save()

            // check League teams (teams.length)
            // if  teams.length = 6  --- throw Error(league is full) / if not continue de process
    })()
}