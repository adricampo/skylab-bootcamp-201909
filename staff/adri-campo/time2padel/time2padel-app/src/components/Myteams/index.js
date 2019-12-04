import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({error, onBack, onCreateTeam }) { 
    return <section className="myteams">
        <div className="myteams__box box">
            <div className="box__info info">
                <p className="info__message">You received an invitation from HONGDA. Do you want to join the team? 🎾🎾</p>
                <a href="#" className="info__teamtitle">skylab3000</a>
                <div className="info__buttons buttons">
                    <button className="buttons__confirm">Confirm</button>
                    <button className="buttons__cancel">Cancel</button>
                </div>
            </div>
            <div className="box__info info">
                <p className="info__message">You received an invitation from XAVIER. Do you want to join the team? 🎾🎾</p>
                <a href="#" className="info__teamtitle">padelmasters</a>
                <div className="info__buttons buttons">
                    <button className="buttons__confirm">Confirm</button>
                    <button className="buttons__cancel">Cancel</button>
                </div>
            </div>
            <div className="box__infoifaccepted infoifaccepted">
                <h3 className="infoifaccepted__teamtitle">padelmafia</h3>
                <div className="infoifaccepted__teaminfo teaminfo">                
                    <p className="teaminfo__player1">player1</p><p className="teaminfo__player2">player2</p>
                    <p className="teaminfo__wins">W: 5</p><p className="teaminfo__loses">L: 0</p> 
                </div>
                <div className="infoifaccepted__buttons buttons">
                    <button className="buttons__delete">Delete Team</button>
                </div>
            </div>
            <div className="myteams__create-team create-team">
                <button className="create-team__button" onClick={event => {
                event.preventDefault()

                onCreateTeam()
            }}>Create Team</button>
            </div>
            <div className="requests__back-button back-button">
                <button className="back-button__button" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go Back</button>
            </div>
        </div>

        {error && <Feedback message={error} />}
    </section>
}