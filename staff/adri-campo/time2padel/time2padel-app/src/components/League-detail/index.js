import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({error, onClose, onBack}) { 
    return <section class="league-detail">
            <div class="league-detail__container container">
                <h3 class="container__league-info league-info">
                    <p class="league-info__level">B+ </p><p class="league-info__gender">Male </p><p class="league-info__date">Tuesday </p><p class="league-info__time">20:30h </p>
                </h3>
                    <ul class="container__teams teams">
                        <li>TEAM 1<p>Player1</p><p>Player2</p></li>
                        <li>TEAM 2<p>Player1</p><p>Player2</p></li>
                        <li>TEAM 3<p>Player1</p><p>Player2</p></li>
                        <li>TEAM 4<p>Player1</p><p>Player2</p></li>
                        <li>TEAM 5<p>Player1</p><p>Player2</p></li>
                        <li>TEAM 6<p>Player1</p><p>Player2</p></li>
                    </ul>
                <div class="container__status league-status">                
                    <p class="league-status__status">AVAILABLE or COMPLETED</p>
                    <p class="league-status__start-date">15/12/2019</p>
                </div>

                <div class="container__playingday container-playingday">
                    <h2 class="container-playingday__title">Playing Day 1</h2>
                    <div class="container-playingday__match match">
                        <p class="match__match-number">Match 1</p><p class="match__team">Team1</p><p class="match__team">Team2</p><p class="match__team">Result</p>
                    </div>
                    <div class="container-playingday__match match">
                        <p class="match__match-number">Match 2</p><p class="match__team">Team3</p><p class="match__team">Team4</p><p class="match__team">Result</p>
                    </div>
                    <div class="container-playingday__match match">
                        <p class="match__match-number">Match 3</p><p class="match__team">Team5</p><p class="match__team">Team6</p><p class="match__team">Result</p>
                    </div>
                </div>
                <div class="container__playingday container-playingday">
                        <h2 class="container-playingday__title">Playing Day 2</h2>
                        <div class="container-playingday__match match">
                            <p class="match__match-number">Match 1</p><p class="match__team">Team1</p><p class="match__team">Team5</p><p class="match__team">Result</p>
                        </div>
                        <div class="container-playingday__match match">
                            <p class="match__match-number">Match 2</p><p class="match__team">Team2</p><p class="match__team">Team3</p><p class="match__team">Result</p>
                        </div>
                        <div class="container-playingday__match match">
                            <p class="match__match-number">Match 3</p><p class="match__team">Team4</p><p class="match__team">Team6</p><p class="match__team">Result</p>
                        </div>
                    </div>
                

                <div class="league-detail__back-button back-button">
                    <button class="back-button__button" onClick={event => {
                        event.preventDefault()

                        onBack()
                    }}>Go Back</button>
                </div>

            </div>

            {error && <Feedback message={error} onClose={onClose} />}
    </section>
}