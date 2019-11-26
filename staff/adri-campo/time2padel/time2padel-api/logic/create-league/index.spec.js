require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { random, floor } = Math
const { database, models: { League } } = require('time2padel-data')
const createLeague = require('.')

describe('logic - create league', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let levels, indexlevel, level, genders, indexgender, gender, numberOfTeams, dates, indexdates, date, times, indextimes, time

    levels = ['D', 'C-', 'C+', 'B-', 'B+', 'A']
    indexlevel = floor(random() * 6)

    genders = ['Male', 'Female']
    indexgender = floor(random() * 2)

    numberOfTeams = floor(random() * 6)
    
    dates = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    indexdates = floor(random() * 5)

    times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
    indextimes = floor(random() * 8)


    beforeEach(async () => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]

        await Promise.all([League.deleteMany()])

    })

    it('should succeed on correct user and league data', async () => {
        const leagueId = await createLeague(level, gender, numberOfTeams, date, time)

        expect(leagueId).to.exist
        expect(leagueId).to.be.a('Object')
        // expect(leagueId).to.have.length.greaterThan(0)
        debugger
        const league = await League.findOne( leagueId._id )
        
        expect(league.level).to.equal(level)
        expect(league.gender).to.equal(gender)
        expect(league.numberOfTeams).to.equal(numberOfTeams)
        expect(league.date).to.equal(date)
        expect(league.time).to.equal(time)

    })

})