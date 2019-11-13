const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { registerUser, authenticateUser, retrieveUser } = require('./logic') 

const api = express()

const jsonBodyParser = bodyParser.json()

const { argv: [, , port = 8080] } = process 

api.route('/users')
    .post(jsonBodyParser, (req, res) => {
        const { body: { name, surname, email, username, password } } = req
       
        res.json({
            message: `OK, registered :P ${name} ${surname} ${email} ${username} ${password}`
        })
    }) 

api.listen(port, () => console.log(`${name} ${version} up and running on port ${port}`))
