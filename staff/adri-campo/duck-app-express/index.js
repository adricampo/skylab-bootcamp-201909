const express = require('express')
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck } = require('./logic')
// const logic = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/', (require, response) => {
    response.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.route('/register')

    .get((require, response) => {
        response.send(View({ body: Register({ path: '/register' }) }))
    })

    .post(bodyParser, (require, response) => {
        const { body: { name, surname, email, password } } = require

        try {
            registerUser(name, surname, email, password)
                .then(() => response.redirect('/'))
                .catch(({ message }) => response.send(View({ body: Register({ path: '/register', error: message }) })))
        } catch ({ message }) {
            response.send(View({ body: Register({ path: '/register', error: message }) }))
        }
    })

app.route('/login')

    .get((require, response) => {
        response.send(View({ body: Login({ path: '/login' }) }))
    })

    .post(bodyParser, (require, response) => {
        const { body: { email, password } } = require

        try { 
            authenticateUser(email, password)
                .then(credentials => {
                    const { id, token } = credentials

                    sessions[id] = { token }

                    //console.dir(sessions)

                    response.setHeader('set-cookie', `id=${id}`)

                    response.redirect('/search')
                })
                .catch(({ message }) => {
                    response.send(View({ body: Login({ path: '/login', error: message }) }))
                })
        } catch ({ message }) {
            response.send(View({ body: Login({ path: '/login', error: message }) }))
        }
    })

app.get('/search', cookieParser, (require, response) => { 
    try {
        const { cookies: { id }, query: { q: query } } = require

        if (!id) return response.redirect('/')

        const session = sessions[id]

        if (!session) return response.redirect('/')

        const { token } = session

        if (!token) return response.redirect('/')

        let name

        retrieveUser(id, token)
            .then(user => {
                name = user.name

                if (!query) return response.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))

                session.query = query

                return searchDucks(id, token, query)
                    .then(ducks => response.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detailPath: '/ducks' }) })))
            })
            .catch(({ message }) => response.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        response.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})

app.post('/logout', cookieParser, (require, response) => {
    response.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = require

    if (!id) return response.redirect('/')

    delete sessions[id]

    response.redirect('/')
})

app.post('/fav', cookieParser, bodyParser, (require, response) => {
    try { 
        const { cookies: { id }, body: { id: duckId } } = require

        if (!id) return response.redirect('/')

        const session = sessions[id]

        if (!session) return response.redirect('/')

        const { token, query } = session

        if (!token) return response.redirect('/')

        toggleFavDuck(id, token, duckId)
            .then(() => response.redirect(`/search?q=${query}`))
            .catch(({ message }) => {
                response.send('TODO error handling')
            })
    } catch ({ message }) {
        response.send('TODO error handling')
    }
})

app.get('/ducks/:id', cookieParser, (require, response) => { 
    try {
        const { params: { id: duckId } } = require 
        const { cookies: { id } } = require
        // const { body: { id: duckId } } = require

        if (!id) return response.redirect('/')

        const session = sessions[id]

        if (!session) return response.redirect('/')

        const { token, query } = session

        if (!token) return response.redirect('/')
        
        debugger
        retrieveDuck(id, token, duckId) 
             
            // .then(() => response.redirect(`/ducks/${duckId}`))
            //.then(duck => response.send(View({ body: console.log(duck) })))
            .then(item => {
                 response.send(View({ body: Detail({ path: '/detail', item, favPath: '/fav', onBack: `/search?q=${query}` }) }))})
            .catch(({message }) => {
                response.send(View({ body: Detail({ path: '/detail', error: message }) }))
            })

    } catch ({ message }) {
        response.send(View({ body: Detail({ path: '/detail', error: message }) }))
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))