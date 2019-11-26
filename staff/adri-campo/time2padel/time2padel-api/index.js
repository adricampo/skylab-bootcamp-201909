require('dotenv').config()

const { argv: [, , port], env: { SECRET, PORT = port || 8080, DB_URL } } = process
const tokenVerifier = require('./helpers/token-verifier')(SECRET)
const cors = require('./utils/cors')

// MODULES
const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
// API
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { errors: { ConflictError, CredentialsError } } = require('time2padel-util')
const { database } = require('time2padel-data')

const api = express()

const jsonBodyParser = bodyParser.json()

api.use(cors)

api.options('*', cors, (req, res) => {
    res.end()
})

app.route('/users')

    .post(jsonBodyParser, (req, res) => {
        const { body: { name, surname, email, username, password, gender } } = req

        try {
            registerUser(name, surname, email, username, password, gender)
                .then(() => res.status(201).end())
                .catch(error => {
                    const { message } = error

                    if (error instanceof ConflictError)
                        return res.status(409).json({ message })

                    res.status(500).json({ message })
                })
        } catch ({ message }) {
            res.status(400).json({ message })
        }
    })

    .get(tokenVerifier, (req, res) => {
        try {
            const { id } = req

            retrieveUser(id)
                .then(user => res.json({ user }))
                .catch(error => {
                    const { message } = error

                    if (error instanceof NotFoundError)
                        return res.status(404).json({ message })

                    res.status(500).json({ message })
                })
        } catch (error) {
            const { message } = error

            res.status(400).json({ message })
        }
    })

api.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})


database.connect(DB_URL)
api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`))
