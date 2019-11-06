const express = require('express')
const View = require('./view/index.js')
const Landing = require('./components/landing')
const Login = require('./components/login')
const Register = require('./components/register')
const Search = require('./components/search')

const { argv: [, , port = 8080] } = process

const app = express() 

app.use(express.static('public'))


app.get('/', (require, response) => {
    response.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (require, response) => {
    response.send(View({ body: Register() }))
})

app.post('/register', (require, response) => {
    let content = ''

    require 




})

app.get('/login', (require, response) => {
    response.send(View({ body: Login() }))
})


app.get('/search', (require, response) => {
    response.send(View(Search()))
})

app.listen(port, () => console.log(`server running on port ${port}`))


