const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { Team, League, PlayingDay, Match } } = require('time2padel-data')
const robin = require('../../helpers/round-robin');

module.exports = function (leagueId, teamId) {
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)
    return (async () => {
        const league = await League.findById(leagueId)
        if (!league) throw new NotFoundError(`league with id ${leagueId} not found`)
        const addTeam = await Team.findById(teamId)
        if (!addTeam) throw new NotFoundError(`league with id ${addTeam} not found`)

        if (addTeam.status !== 'ACCEPTED') throw new Error(`You should validate your team ${addTeam.id} to continue`)
        if (league.teams.length >= 6) throw new Error(`Sorry, this league is complete`)
        if (league.teams.toString().includes(addTeam._id.toString())) throw new Error (`This team has been already registered on that league`)

        league.teams.push(teamId)
        addTeam.leagues.push(leagueId)

        if (league.teams.length === 6) {
            league.status = 'COMPLETED'
            const myTeams = league.teams.map(team => team._id.toString())

            let schedule = robin(myTeams)

            for (let i = 0; i < schedule.length; i++) {
                const playingDay = new PlayingDay
                for (let j = 0; j < schedule[i].length; j++) {
                    const match = new Match
                    match.teams.push(schedule[i][j][0], schedule[i][j][1])
                    playingDay.matches.push(match)
                }
                league.playingDays.push(playingDay)
            }
            league.startDate = new Date
           
        }
        await addTeam.save()
        await league.save()

    })()
}