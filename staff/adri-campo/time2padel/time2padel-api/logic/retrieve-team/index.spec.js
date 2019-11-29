require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveTeam = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { Team } } = require('time2padel-data')

describe('logic - retrieve team', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, player1, player2, wins, loses, status, index, statuses
    statuses = ['ACCEPTED', 'DENNIED']
    index = floor(random()* 2)

    beforeEach(async () => {
        const p1 = await User.create({username : `username1-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `username2-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        player1 = p1.id
        player2 = p2.id
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = statuses[index]
        
        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const team = await Team.create({ title, player1, player2, wins, loses, status })
        id = team.id
    })

    it('should succeed on correct data', async () => {
        const team = await retrieveTeam(title)

        expect(team).to.exist
        expect(team.title).to.equal(title)
        expect(team.player1.toString()).to.equal(player1.id)
        expect(team.player2.toString()).to.equal(player2.id)
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveTeam(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))
})