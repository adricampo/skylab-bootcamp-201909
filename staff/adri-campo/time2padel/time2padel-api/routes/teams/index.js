const { Router } = require('express')
const { createTeam, updateTeam, deleteTeam, retrieveTeam } = require('../../logic')
// const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('time2padel-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

//CREATE TEAM
router.post('/:id', jsonBodyParser, (req, res) => {
    const { params: { id }, body: { username, title } } = req

    try {
        createTeam(id, username, title)
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

//UPDATE TEAM
router.patch('/:id', jsonBodyParser, (req, res) => {
    try {
        const { params: { id }, body: { answer } } = req

        updateTeam(id, answer)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//DELETE TEAM
router.delete('/:id', tokenVerifier, (req, res) => {
    try {
        const { params: { id } } = req

        deleteTeam(id)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//RETRIEVE TEAM
router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        debugger
        const { body: { title } } = req

        retrieveTeam(title)
            .then(team => res.json( team ))
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
module.exports = router