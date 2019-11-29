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
        //errror

        const addTeam = await Team.findById(teamId)
        //error

        if (addTeam.status === 'ACCEPTED' && league.teams.length < 6) {

            league.teams.push(teamId)
            //saveLeague
            addTeam.leagues.push(leagueId)
            //saveTeam

            if (league.teams.length === 6) {
                league.status = 'COMPLETED'
                const myTeams = league.teams.map(team => team._id.toString())
                // const deleteme = ['1','2','3','4','5','6']
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

        } else {
            throw new ConflictError(`Sorry, you cannot join this league ${league.id} beacuse is already completed`)
        }
    })()
}