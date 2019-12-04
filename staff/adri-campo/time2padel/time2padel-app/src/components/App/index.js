import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
//COMPONENTS
import Header from '../Header'
import Footer from '../Footer'
import Landing from '../Landing'
import RegistrationPage from '../Registration-page'
import Main from '../Main'
import UserPage from '../Userpage'
import MyTeams from '../Myteams'
import TeamCreation from '../Team-creation'
import Leagues from '../Leagues'
// import LeagueDetail from '../League-detail'
import LeagueCreation from '../League-creation'

//LOGIC
import { authenticateUser, registerUser, retrieveUser, modifyUser } from '../../logic'

export default withRouter(function ({ history }) { 
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [gender, setGender] = useState()
    const [email, setEmail] = useState()
	const [error, setError] = useState()

    useEffect(() => { 
        const { token } = sessionStorage;   

        (async () => {
            if (token) {                
                const { name } = await retrieveUser(token)
                const { surname } = await retrieveUser(token)         
                const { gender } = await retrieveUser(token)
                const { email } = await retrieveUser(token)

                setName(name)
                setSurname(surname)
                setGender(gender)
                setEmail(email)
               
            }
        })()
    }, [sessionStorage.token])

    //LANDING
    function handleGoToRegistrationPage() { history.push('/registration-page') }


    //REGISTRATION-PAGE
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

    //MAIN -HEADER MENU-
    function handleGoToUserPage() { history.push('/userpage') } 
    function handleGoToMyTeams() { history.push('/myteams') } 
    function handleGoToLeagues() { history.push('/leagues') } 
    //como hacer para que el menu desaparesca
    
    //USER-PAGE
    async function handleModifyUser(username, password) {
        try {
            const token = sessionStorage.token
            
            await modifyUser(token, username, password)

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // MYTEAMS
    function handleCreateTeam() { history.push('/team-creation') } 

    // LEAGUES 
    function handleCreateLeague() { history.push('/league-creation')}


    // GO BACK -TO MAIN PAGE-
    function handleGoBack() { history.push('/main') }
    // GO BACK -TO FROM TEAMCREATION -> MYTEAMS
    function handleGoBackMyTeams() { history.push('/myteams') }

    // CLOSE ERROR
    function handleOnClose() { 
         setError(undefined)
    }

    // LOGOUT
    function handleLogout() {
        sessionStorage.clear()

        history.push('/')
    }

    const { token } = sessionStorage

    return (
            <>
                <Route exact path="/" render={() => token ? <Redirect to="/main" /> : <Landing onRegistrationPage={handleGoToRegistrationPage} />} />
                <Route path="/registration-page" render={() => token ? <Redirect to="/main" /> : <RegistrationPage onSignIn={handleSignIn} onSignUp={handleSignUp} error={error} onClose={handleOnClose} />} />  
                <Route path="/main" render={() => token ? <Main /> : <Redirect to="/" /> } /> 
                <Route path="/userpage" render={() => token ? <UserPage name={name} surname={surname} gender={gender} email={email} onModifyUser={handleModifyUser} onBack={handleGoBack} error={error} onClose={handleOnClose} /> : <Redirect to="/" />} />
                <Route path="/myteams" render={() => token ? <MyTeams onBack={handleGoBack} onCreateTeam={handleCreateTeam} /> : <Redirect to="/" />} />
                <Route path="/team-creation" render={() => token ? <TeamCreation onCreateTeam={handleCreateTeam} onBack={handleGoBackMyTeams} /> : <Redirect to="/" />} />
                <Route path="/leagues" render={() => token ? <Leagues onBack={handleGoBack} onCreateLeague={handleCreateLeague} /> : <Redirect to="/" />} />
                <Route path="/league-creation" render={() => token ? <LeagueCreation onBack={handleGoBack}  /> : <Redirect to="/" />} />
                
                { token && <> <Header onLogout={handleLogout} name={name} onUserInfo={handleGoToUserPage} onMyTeams={handleGoToMyTeams} onLeagues={handleGoToLeagues} error={error} /> <Footer /> </>}
            </>
    )
})


