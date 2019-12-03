import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import RegistrationPage from '../Registration-page'
import Main from '../Main'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser } from '../../logic'

export default withRouter(function ({ history }) {

    const { token } = sessionStorage


    function handleGoToRegistrationPage() { history.push('/registration-page') }

    async function handleGoToMainSignIn(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/main')
        } catch (error) {
            console.error(error)
        }
    }

    async function handleGoToMainSignUp(name, surname, email, username, password) {
        try {
            await registerUser(name, surname, email, username, password)

            history.push('/main')
        } catch (error) {
            console.error(error)
        }
    }

    // function handleGoToMainSignIn() { history.push('/main') }

    // function handleGoToMainSignUp() { history.push('/main') }

    return (<>
        <Route exact path="/" render={() => token ? <Redirect to="/main" /> : <Landing onRegister={handleGoToRegistrationPage} />} />
        <Route path="/registration-page" render={() => token ? <Redirect to="/main" /> : <RegistrationPage onSignIn={handleGoToMainSignIn} onSignUp={handleGoToMainSignUp} />} />  
        <Route path="/main" render={() => <Main />} />  
    </>)
})


