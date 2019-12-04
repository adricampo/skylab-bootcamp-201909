import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ error, onClose, onBack, onCreateLeague }) {
    return <main className="leagues">
        <ul className="leagues__list list">
            <div className="list__container container">
                <li><a href="#" className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level B - Masc - W: 20:00h</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague">Add Team</button>
                        <button className="buttons__deleteleague">Delete League</button>
                    </div>
                </li>
            </div>
            <div className="list__container container">
                <li><a href="#" className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level C+ - Fem - M: 19:00h</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague">Add Team</button>
                        <button className="buttons__deleteleague">Delete League</button>
                    </div>
                </li>
            </div>
            <div className="list__container container">
                <li><a href="#" className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level B+ - Masc - Tu: 18:00h</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague">Add Team</button>
                        <button className="buttons__deleteleague">Delete League</button>
                    </div>
                </li>
            </div>
            <div className="list__container container">
                <li><a href="#" className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level D - Mix - F: 20:00h</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague">Add Team</button>
                        <button className="buttons__deleteleague">Delete League</button>
                    </div>
                </li>
            </div>
            <div className="list__container container">
                <li><a href="#" className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level B+ - Fem - F: 21:00h</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague">Add Team</button>
                        <button className="buttons__deleteleague">Delete League</button>
                    </div>
                </li>
            </div>
        </ul>
        <div className="leagues__buttons buttons">
            <div className="buttons__create-league create-league">
                <button className="create-league__button" onClick={event => {
                event.preventDefault()

                onCreateLeague()
            }}>Create League</button>
            </div>
            <div className="buttons__back-button back-button">
                <button className="back-button__button" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go Back</button>
            </div>
        </div>

        {error && <Feedback message={error} onClose={onClose} />}
    </main>
}