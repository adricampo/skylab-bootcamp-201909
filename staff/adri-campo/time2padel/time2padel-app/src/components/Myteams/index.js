import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import Team from '../Team'

export default function ({error, onBack, onCreateTeam, teams}) { 
    return <section className="myteams">
        <ul className="myteams__box"> 
            {teams && teams.map(team => <li className="item" key={team.id}><Team team={team} /></li>)}
        </ul>
        <div className="myteams__create-team create-team">
            <button className="create-team__button" onClick={event => {
            event.preventDefault()

            onCreateTeam()
        }}>Create Team</button>
        </div>
        <div className="myteams__back-button back-button">
            <button className="back-button__button" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go Back</button>
        </div>

        {error && <Feedback message={error} />}
    </section>
}