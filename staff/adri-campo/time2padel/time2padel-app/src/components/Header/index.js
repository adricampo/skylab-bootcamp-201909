import React from 'react'
import './index.sass'

export default function ({onLogout, name, onUserInfo, onMyTeams, onLeagues}) {
    return <header className="header">
                <img className="header__logo" src={process.env.PUBLIC_URL + '/img/iconopalapadel.png'}/>
                <h1 className="header__title">Time2Padel</h1>
                <span className="header__welcome">Hi {name} 👋🏻</span>
                <input type="checkbox" id="show-menu"/>
                <label className="header__hamburguer" htmlFor="show-menu"><i className="fas fa-bars"></i></label>
                <nav className="header__nav menu">
                    <ul className="menu__list list">
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onMyTeams()
                        }}>My Teams</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onUserInfo()
                        }}>User Info</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onLeagues()
                        }}>Leagues</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onLogout()
                        }}>Logout</a></li>
                    </ul>
                </nav>
            </header>
}