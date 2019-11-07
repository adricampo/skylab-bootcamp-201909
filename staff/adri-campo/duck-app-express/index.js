const express = require('express')
const { View, Landing, Register, Login, Search } = require('./components')
const { registerUser, authenticateUser, searchDucks, retrieveUser } =('./logic')
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
        } catch(error) {
            response.send(View({ body: Register({ path: '/register', error: error.message })}))
        }
    })

app.get('/login', (require, response) => { 
    response.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (require, response) => { 
    const { body: { email, password } } = require
    
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



app.get('/search', cookieParser, (require, response) => {
    try {
        const { cookies: { id } } = require

        if (!id) return response.redirect('/')

        const token = sessions[id]

        if (!token) return response.redirect('/')

        retrieveUser(id, token, (error, user) => {
            if (error) return response.send("ERROR")

            const { name } = user

            const { query: { q: query } } = require

            if (!query) response.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))
            else {
                try {
                    searchDucks(id, token, query, (error,ducks) => {
                        if (error) return response.send("ERROR")

                        console.log(ducks)

                        response.send(View({ body: `${Search({ path: '/search', query, name, logout: '/logout' })} ` }))
                    })
                } catch (error) {
                    response.send('ERROR')
                }
            }
        })
    } catch (error) {
        response.send('That is wrong mate')
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