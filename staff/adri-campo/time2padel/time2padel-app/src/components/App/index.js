import React, { useState, useEffect } from 'react';
import './index.sass'
import Landing from '../Landing'
import RegistrationPage from '../Registration-page'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

// const { token } = sessionStorage

function handleGoToRegistrationPage() { history.push('/registration-page') }

    return (<>
        <Route exact path="/" render={() => <Landing onRegistrationPage={handleGoToRegistrationPage} />} />
        <Route path="/registration-page" render={() => <RegistrationPage onRegistrationPage={handleGoToRegistrationPage} />} />

    </>)
})


