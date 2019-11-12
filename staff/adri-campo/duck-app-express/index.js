const express = require('express')
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck, favsList } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const { argv: [, , port = 8080] } = process

const app = express()

app.set('view engine', 'pug')
app.set('views', 'components')

app.use(express.static('public'))

app.use(session({
    store: new FileStore({
    }),
    secret: 'a super secret thing',
    saveUninitialized: true,
    resave: true
}))

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.get('/', (require, response) => {
    response.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.route('/register')

    .get((require, response) => {
        // response.send(View({ body: Register({ path: '/register' }) }))
        response.render('register', { path: '/register'})
    })

    .post(formBodyParser, (require, response) => {
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

    .post(formBodyParser, (require, response) => {
        const { session, body: { email, password } } = require

        try { 
            authenticateUser(email, password)
                .then(credentials => {
                    const { id, token } = credentials

                    session.userId = id
                    session.token = token

                    session.save(() => response.redirect('/search'))

            
                })
                .catch(({ message }) => {
                    response.send(View({ body: Login({ path: '/login', error: message }) }))
                })
        } catch ({ message }) {
            response.send(View({ body: Login({ path: '/login', error: message }) }))
        }
    })

app.get('/search', (require, response) => { 
    try {
        const { session, query: { q: query } } = require

        if (!session) return response.redirect('/')

        const { userId: id, token } = session

        if (!token) return response.redirect('/')

        let name

        retrieveUser(id, token)
            .then(user => {
                name = user.name

                if (!query) return response.send(View({ body: Search({ path: '/search', name, favPath: '/fav', favsList: '/favs-list', logout: '/logout' }) }))

                return searchDucks(id, token, query)
                    .then(ducks => {
                        session.query = query
                        session.view = 'search'

                        session.save(() => response.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', favsList: '/favs-list', detailPath: '/ducks' }) })))
                    })
                })        
            .catch(({ message }) => response.send(View({ body: Search({ path: '/search', query, name, favPath: '/fav', favsList: '/favs-list', logout: '/logout', error: message }) })))
    } catch ({ message }) {
        response.send(View({ body: Search({ path: '/search', query, name, favPath: '/fav', favsList: '/favs-list', logout: '/logout', error: message }) }))
    }
})

app.post('/logout', (require, response) => {
    const { session } = require

    session.destroy(() => {
    response.clearCookie('connect.sid', { path: '/' })
    // response.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    response.redirect('/')

    })
})

app.post('/fav', formBodyParser, (require, response) => {
    try { 
        const { session, body: { id: duckId }, headers: { referer } } = require

        if (!session) return response.redirect('/')

        const { userId: id, token } = session

        if (!token) return response.redirect('/')

        toggleFavDuck(id, token, duckId)
            .then(() => response.redirect(referer))
            .catch(({ message }) => {
                response.send('TODO error handling')
            })
    } catch ({ message }) { 
        response.send('TODO error handling')
    }
})

app.get('/ducks/:id', (require, response) => { 
    try {
        const { session, params: { id: duckId } } = require 
        
        if (!session) return response.redirect('/')

        const { userId: id, token, view, query } = session

        if (!token) return response.redirect('/')
        
        retrieveDuck(id, token, duckId) 
            // .then(() => response.redirect(`/ducks/${duckId}`))
            //.then(duck => response.send(View({ body: console.log(duck) })))
            .then(duck => {
                 response.send(View({ body: Detail({ path: '/detail', item: duck, favPath: '/fav', onBack: view === 'search' ? `/search?q=${query}` : '/' }) }))})
            .catch(({message }) => {
                response.send(View({ body: Detail({ path: '/detail', error: message }) }))
            })

    } catch ({ message }) {
        response.send(View({ body: Detail({ path: '/detail', error: message }) }))
    }
})

app.get('/favs-list', (require, response) => { 
    try {
        const { session } = require 

        if (!session) return response.redirect('/')

        const { userId: id, token } = session

        if (!token) return response.redirect('/')

        let name
        
        retrieveUser(id, token) 
            .then(user => {
                name = user.name

                return favsList(id, token)
                    .then(ducks => { debugger
                        session.view = 'favs-list'
                      
                        session.save(() => response.send(View({ body: Search({ path: '/search', name, logout: '/logout', results: ducks, favPath: '/fav', favsList: '/favs-list', detailPath: '/ducks' }) })))
                    })
            })
            .catch(({ message }) => response.send(View({ body: Search({ path: '/search', name, favPath: '/fav', favsList: '/favs-list', logout: '/logout', error: message }) })))
    } catch ({ message }) {
        response.send(View({ body: Search({ path: '/search', name, favPath: '/fav', favsList: '/favs-list', logout: '/logout', error: message }) }))
    }
})

app.listen(port, () => console.log(`server running on port ${port}`))