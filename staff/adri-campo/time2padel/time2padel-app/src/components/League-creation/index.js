import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({error, onClose}) {
    return <section class="league-creation hidden">
            <div class="league-creation__container container">
                <h2 class="container__title">League Creation</h2>
                <section class="container__league-info league-info">
                    <form class="league-info__form">
                        <label for="level">Level: 
                            <input type="radio" class="league-info__name" name="level" value="D"/> D
                            <input type="radio" class="league-info__name" name="level" value="C-"/> C-
                            <input type="radio" class="league-info__name" name="level" value="C+"/> C+
                            <input type="radio" class="league-info__name" name="level" value="B-"/> B-
                            <input type="radio" class="league-info__name" name="level" value="B+"/> B+
                            <input type="radio" class="league-info__name" name="level" value="A"/> A
                        </label>
                        <label for="gender">Gender: <input type="radio" class="league-info__name" name="gender" value="Male"/> Male<input type="radio" class="sign-up__name" name="gender" value="Female"/> Female</label>
                        <label for="date">Date: 
                                <input type="radio" class="league-info__name" name="date" value="Monday"/>Monday
                                <input type="radio" class="league-info__name" name="date" value="Tuesday"/>Tuesday
                                <input type="radio" class="league-info__name" name="date" value="Wednesday"/>Wednesday
                                <input type="radio" class="league-info__name" name="date" value="Thursday"/>Thursday
                                <input type="radio" class="league-info__name" name="date" value="Friday"/>Friday
                        </label>   
                        <label for="time">Time: 
                            <input type="radio" class="league-info__name" name="time" value="18:00h"/>18:00h
                            <input type="radio" class="league-info__name" name="time" value="18:30h"/>18:30h
                            <input type="radio" class="league-info__name" name="time" value="19:00h"/>19:00h
                            <input type="radio" class="league-info__name" name="time" value="19:30h"/>19:30h
                            <input type="radio" class="league-info__name" name="time" value="20:00h"/>20:00h
                            <input type="radio" class="league-info__name" name="time" value="20:30h"/>20:30h
                            <input type="radio" class="league-info__name" name="time" value="21:00h"/>21:00h
                            <input type="radio" class="league-info__name" name="time" value="21:30h"/>21:30h
                        </label>
                        
                    </form>
                </section>
                <div class="container__buttons buttons">
                    <button class="buttons__confirm">Confirm</button>
                    <button class="buttons__cancel">Cancel</button>
                </div>
            </div>

            {error && <Feedback message={error} onClose={onClose} />}
        </section>
}