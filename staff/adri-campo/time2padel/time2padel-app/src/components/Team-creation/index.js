import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ error, onClose, onBack }) {
    return <section className="team-creation">
        <div className="team-creation__container container">
            <h2 className="container__title">Team Creation</h2>
            <section className="container__players-info players-info">
                <h3 className="players-info__title">Player1</h3>
                <form className="players-info__form1">
                    <label>Username: <input type="email" className="players-info_name" name="username"/></label>
                    <label>Password: <input type="password" className="players-info__name" name="password"/></label>
                </form>
                <h3 className="players-info__title">Player2</h3>
                <form className="players-info__form2">
                    <label>Username: <input type="email" className="players-info_name" name="username"/></label>
                    <span className="message">A request will be sent to this user</span>
                </form>
                <h3 className="players-info__title">Team Title</h3>
                <form className="players-info__teamtitle">
                    <label>Name: <input type="name" className="players-info_name" name="name"/></label>
                </form>
                
            </section>
            <div className="container__buttons buttons">
                <button className="buttons__confirm">Confirm</button>
                <button className="buttons__cancel" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Cancel</button>
            </div>
        </div>

        {error && <Feedback message={error} onClose={onClose} />}
    </section>
}