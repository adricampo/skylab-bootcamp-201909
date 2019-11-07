const express = require('express')
const View = require('./view/index.js')
const Landing = require('./components/landing')
const Register = require('./components/register')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const Login = require('./components/login')
const Search = require('./components/search')
const searchDucks = require('./logic/search-ducks')
// const session = require('express-session')

const { argv: [, , port = 8080] } = process

const app = express() 

// app.use(session({
//     secret: 's3cr3t th1ng',
//     saveUninitialized: true,
//     resave: true
// }))

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
                else response.redirect('/login')
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
            authenticateUser(email, password, (error,credentials) => {
                if (error) return response.send('ERROR authenticate')
                credentials.id = id
                response.redirect('/search')
            })
        } catch(error) {
                if(error) response.send('WTF! THAT IS WRONG')
        }
    })
})


app.get('/search', (require, response) => {
    const { query: { q }} = require
    if (!q) response.send(View({ body: Search({ path: '/search'}) }))
    else {
        try{
        response.send("QUERY")
    } catch {

    }
}

})

app.listen(port, () => console.log(`server running on port ${port}`))