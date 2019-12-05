import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({error, onClose}) {
    return <section className="league-creation hidden">
            <div className="league-creation__container container">
                <h2 className="container__title">League Creation</h2>
                <section className="container__league-info league-info">
                    <form className="league-info__form">
                        <label>Level: 
                            <input type="radio" className="league-info__name" name="level" value="D"/> D
                            <input type="radio" className="league-info__name" name="level" value="C-"/> C-
                            <input type="radio" className="league-info__name" name="level" value="C+"/> C+
                            <input type="radio" className="league-info__name" name="level" value="B-"/> B-
                            <input type="radio" className="league-info__name" name="level" value="B+"/> B+
                            <input type="radio" className="league-info__name" name="level" value="A"/> A
                        </label>
                        <label>Gender: <input type="radio" className="league-info__name" name="gender" value="Male"/> Male<input type="radio" className="sign-up__name" name="gender" value="Female"/> Female</label>
                        <label>Date: 
                                <input type="radio" className="league-info__name" name="date" value="Monday"/>Monday
                                <input type="radio" className="league-info__name" name="date" value="Tuesday"/>Tuesday
                                <input type="radio" className="league-info__name" name="date" value="Wednesday"/>Wednesday
                                <input type="radio" className="league-info__name" name="date" value="Thursday"/>Thursday
                                <input type="radio" className="league-info__name" name="date" value="Friday"/>Friday
                        </label>   
                        <label>Time: 
                            <input type="radio" className="league-info__name" name="time" value="18:00h"/>18:00h
                            <input type="radio" className="league-info__name" name="time" value="18:30h"/>18:30h
                            <input type="radio" className="league-info__name" name="time" value="19:00h"/>19:00h
                            <input type="radio" className="league-info__name" name="time" value="19:30h"/>19:30h
                            <input type="radio" className="league-info__name" name="time" value="20:00h"/>20:00h
                            <input type="radio" className="league-info__name" name="time" value="20:30h"/>20:30h
                            <input type="radio" className="league-info__name" name="time" value="21:00h"/>21:00h
                            <input type="radio" className="league-info__name" name="time" value="21:30h"/>21:30h
                        </label>
                        
                    </form>
                </section>
                <div className="container__buttons buttons">
                    <button className="buttons__confirm">Confirm</button>
                    <button className="buttons__cancel">Cancel</button>
                </div>
            </div>

            {error && <Feedback message={error} onClose={onClose} />}
        </section>
}