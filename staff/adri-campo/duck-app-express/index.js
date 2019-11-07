const express = require('express')
const View = require('./view/index.js')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const searchDucks = require('./logic/search-ducks')
const retrieveUser = require('./logic/retrieve-user')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')
const Search = require('./components/search')


const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express() 

app.use(express.static('public'))

app.get('/', (require, response) => {
    response.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (require, response) => {
    response.send(View({ body: Register({ path: '/register'}) }))
})

app.post('/register', (require, response) => {
    let content = ''

    require.on('data', chunk => content += chunk)

    require.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)
    
        try {
            registerUser(name, surname, email, password, error => {
                if (error) response.send("ERROR")

                else response.redirect('/')
            })

        } catch(error) {
            if(error) response.send('WTF! THAT IS WRONG')
        }

    })
})

app.get('/login', (require, response) => { 
    response.send(View({ body: Login({ path: '/login'}) }))
})

app.post('/login', (require, response) => { 
    let content = ''

    require.on('data', chunk => content += chunk)

    require.on('end', () => {
        const { email, password } = querystring.parse(content)
    
        try {
            authenticateUser(email, password, (error, credentials) => {
                if (error) return response.send('ERROR authenticate')

                const { id, token } = credentials
                sessions[id] = token

                response.setHeader('set-cookie', `id=${id}`)
                response.redirect('/search')
            })
        } catch(error) {
                if(error) response.send('WTF! THAT IS WRONG')
        }
    })
})

app.get('/search', (require, response) => {
    try {
        const 

    } catch (error) {
        response.send('That is wrong mate')
    }

})


app.post('/logout', (require, response) => { 
    response.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    response.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))