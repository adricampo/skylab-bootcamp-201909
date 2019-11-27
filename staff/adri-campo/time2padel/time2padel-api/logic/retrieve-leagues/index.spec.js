require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveLeagues = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { League } } = require('time2padel-data')

describe('logic - retrieve leagues', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let levels, indexlevel, level, genders, indexgender, gender, numberOfTeams, dates, indexdates, date, times, indextimes, time

    levels = ['D', 'C-', 'C+', 'B-', 'B+', 'A']
    indexlevel = floor(random() * 6)

    genders = ['MALE', 'FEMALE']
    indexgender = floor(random() * 2)

    numberOfTeams = 6
    
    dates = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
    indexdates = floor(random() * 5)

    times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
    indextimes = floor(random() * 8)


    beforeEach(async () => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        numberOfTeams
        date = dates[indexdates]
        time = times[indextimes]

        await League.deleteMany()

        for (let i = 0; i < 5; i++) {
            await League.create({ level, gender, numberOfTeams, date, time })
        }

    })

    it('should succeed on correct user and tas', async () => {
        const leagues = await retrieveLeagues
        
        

    })

    after(() => User.deleteMany().then(database.disconnect))
})