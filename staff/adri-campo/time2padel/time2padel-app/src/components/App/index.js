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
import MyPendingteams from '../Mypendingteams'
import TeamCreation from '../Team-creation'
import Leagues from '../Leagues'
// import LeagueDetail from '../League-detail'
import LeagueCreation from '../League-creation'


//LOGIC
import { authenticateUser, registerUser, retrieveUser, modifyUser, createTeam, retrieveUserTeams } from '../../logic'

export default withRouter(function ({ history }) { 
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [username, setUsername] = useState()
    const [gender, setGender] = useState()
    const [email, setEmail] = useState()
	const [error, setError] = useState()
    const [teams, setTeams] = useState([])
    const [id, setId] = useState()

    useEffect(() => {   
        const { token } = sessionStorage;   

        (async () => { 
            if (token) {                
                const { name } = await retrieveUser(token)
                const { surname } = await retrieveUser(token)         
                const { username } = await retrieveUser(token)         
                const { gender } = await retrieveUser(token)
                const { email } = await retrieveUser(token)
                const { id } = await retrieveUser(token)

                setName(name)
                setSurname(surname)
                setUsername(username)
                setGender(gender)
                setEmail(email)
                setId(id)
            }
        })()
    }, [sessionStorage.token])

    // async function retrieveTeams(token) {
    //     const teams = await listTeams(token)

    //     setTeams(teams)
    // }

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

    //  1) USERPAGE
    function handleGoToUserPage() { history.push('/userpage') } 
   
    // 1.1) USERPAGE - MODIFY USER
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

    //  2) MYTEAMS
    async function handleGoToMyTeams() { 
        try { 
            const token = sessionStorage.token
          
            const teams = await retrieveUserTeams(token)
       
            setTeams(teams)
            history.push('/myteams') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 2.1) MYTEAMS - CREATE TEAM
    function handleCreateTeam() { history.push('/team-creation') } 
            
    // 2.1.1) CREATE TEAM - TEAM CREATION
    async function handleCreateNewTeam(username, title) {
        try {
            const token = sessionStorage.token
            
            await createTeam(token, username, title)
            
            const teams = await retrieveUserTeams(token)

            setTeams(teams)
            history.push('/myteams')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // GO BACK -TO MYTEAMS FROM TEAMCREATION
    function handleGoBackMyTeams() { history.push('/myteams') }

    //  3) REQUESTS (MY PENDING TEAMS)
    async function handleGoToMyPendingTeams() { 
        try { 
        const token = sessionStorage.token
        
        const teams = await retrieveUserTeams(token)
            
        setTeams(teams)
        history.push('/mypendingteams') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 3.1) REQUESTS - CONFIRM OR CANCEL THE TEAM
    


    //  4) LEAGUES 
    function handleGoToLeagues() { history.push('/leagues') } 
    //como hacer para que el menu desaparesca
    

    // 4.1) LEAGUES - CREATE LEAGUE
    function handleCreateLeague() { history.push('/league-creation')}

   


    // GO BACK -TO MAIN PAGE-
    function handleGoBack() { history.push('/main') }
   

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
                <Route path="/myteams" render={() => token ? <MyTeams onBack={handleGoBack} onCreateTeam={handleCreateTeam} teams={teams} /> : <Redirect to="/" />} />
                <Route path="/mypendingteams" render={() => token ? <MyPendingteams onBack={handleGoBack} teams={teams} id={id} /> : <Redirect to="/" />} />
                <Route path="/team-creation" render={() => token ? <TeamCreation username={username} onCreateNewTeam={handleCreateNewTeam} onBack={handleGoBackMyTeams} error={error} onClose={handleOnClose} /> : <Redirect to="/" />} />
                <Route path="/leagues" render={() => token ? <Leagues onBack={handleGoBack} onCreateLeague={handleCreateLeague} /> : <Redirect to="/" />} />
                <Route path="/league-creation" render={() => token ? <LeagueCreation onBack={handleGoBack}  /> : <Redirect to="/" />} />
                
                { token && <> <Header onLogout={handleLogout} name={name} onUserInfo={handleGoToUserPage} onMyTeams={handleGoToMyTeams} onLeagues={handleGoToLeagues} onMyPendingTeams={handleGoToMyPendingTeams} error={error} /> <Footer /> </>}
            </>
    )
})


