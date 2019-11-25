require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { User } } = require('time2padel-data')

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, username, gender, email, password

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        gender = `gender-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, username, gender, email, password })

        id = user.id
    })

    it('should succeed on correct user id', async () => {
        const user = await retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.gender).to.equal(gender)
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
        expect(user.password).to.be.undefined
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))
})