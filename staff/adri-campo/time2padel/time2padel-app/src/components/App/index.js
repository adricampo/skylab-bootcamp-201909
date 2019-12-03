import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
//COMPONENTS
import Landing from '../Landing'
import RegistrationPage from '../Registration-page'
import Main from '../Main'
//LOGIC
import { authenticateUser, registerUser, retrieveUser } from '../../logic'

export default withRouter(function ({ history }) { 
    const [name, setName] = useState()
	const [error, setError] = useState()

    useEffect(() => { 
        const { token } = sessionStorage;   

        (async () => {
            if (token) {
                
                const { name } = await retrieveUser(token)

                setName(name)
            }
        })()
    }, [sessionStorage.token])

    function handleGoToRegistrationPage() { history.push('/registration-page') }

    async function handleSignIn(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleSignUp(name, surname, username, gender, email, password) {
        try {
            await registerUser(name, surname, username, gender, email, password)

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    function handleLogout() {
        sessionStorage.clear()

        history.push('/')
    }

    const { token } = sessionStorage

    return (
            <>
                <Route exact path="/" render={() => token ? <Redirect to="/main" /> : <Landing onRegistrationPage={handleGoToRegistrationPage} />} />
                <Route path="/registration-page" render={() => token ? <Redirect to="/main" /> : <RegistrationPage onSignIn={handleSignIn} onSignUp={handleSignUp} error={error} />} />  
                <Route path="/main" render={() => token ? <Main name={name} /> : <Redirect to="/" /> } />  
                { token && <Main onLogout={handleLogout} /> }
            </>
    )
})


