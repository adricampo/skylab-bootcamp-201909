const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { registerUser } = require('./logic') 

const api = express()

const jsonBodyParser = bodyParser.json()

const { argv: [, , port = 8080] } = process 

api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req
    registerUser(name, surname, email, username, password)
        .then( () => {
            res.json({
                message: `OK, registered :P ${name} ${surname} ${email} ${username} ${password}`
            })
        })
        .catch(error => console.log(error))
    })   

api.listen(port, () => console.log(`${name} ${version} up and running on port ${port}`))
