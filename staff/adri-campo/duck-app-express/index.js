const express = require('express')
const { View, Landing, Register, Login, Search } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks } =('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')


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

app.post('/register', bodyParser, (require, response) => {
    const { body : { name, surname, email, password }} = require

        try {
            registerUser(name, surname, email, password)
                .then( () => response.redirect('/'))
                .catch(({ message }) => response.send(View({ body: Register({ path: '/register', error: message }) })))
        } catch({ message }) {
            response.send(View({ body: Register({ path: '/register', error: error.message })}))
        }
    })

app.get('/login', (require, response) => { 
    response.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (require, response) => { 
    const { body: { email, password } } = require
    debugger
    try {
        authenticateUser(email, password)
            .then(credentials => {
                const { id, token } = credentials

                sessions[id] = token



                response.setHeader('set-cookie', `id=${id}`) 

                response.redirect('/search') 
        })
        .catch(({ message }) => {
            response.send(View({ body: Login({ path: '/login', error: message + '1' }) })) 
        })
    } catch ({ message }) {
            response.send(View({ body: Login({ path: '/login', error: message + '2' }) }))
        }
    })

app.get('/search', cookieParser, (require, response) => {
    try {
        const { cookies: { id } } = require

        if (!id) return response.redirect('/')

        const token = sessions[id]

        if (!token) return response.redirect('/')

        retrieveUser(id, token)
            .then(user => {

                const { name } = user
                const { query: { q: query } } = require

                if (!query) return response.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))
                    
                    try {
                        searchDucks(id, token, query)
                            .then(ducks => response.send(View({ body: `${Search({ path: '/search', query, name, logout: '/logout' })}` })))
                            .catch(({ message }) => response.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) })))
                    } catch ({ message }) {
                        response.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) }))
                    }
                })
    } catch ({ message }) {
        response.send(View({ body: Search({ path: '/search', name, logout: '/logout', error: message }) }))
    }

})


app.post('/logout', cookieParser, (require, response) => { 
    response.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = require

    if(!id) return response.redirect('/')

    delete sessions[id]

    response.redirect('/')
})

app.listen(port, () => console.log(`server running on port ${port}`))