import React from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'

export default withRouter (function ({history}) {
    // function handleGoToRegistrationPage() { history.push('/registration-page') }

    return <>
            <header className="header">
                <img className="header__logo" src={process.env.PUBLIC_URL + '/img/iconopalapadel.png'}/>
                <h1 className="header__title">Time2Padel</h1>
                <input type="checkbox" id="show-menu"/>
                <label className="header__hamburguer" for="show-menu"><i className="fas fa-bars"></i></label>
                <nav className="header__nav menu">
                    <ul className="menu__list list">
                        <li><a href="#" className="list__item">My Teams</a></li>
                        <li><a href="#" className="list__item">User Info</a></li>
                        <li><a href="#" className="list__item">Leagues</a></li>
                        <li><a href="#" className="list__item">Logout</a></li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <section className="main__welcome welcome">
                    <h2 className="welcome__title">Welcome</h2>
                  
                </section>
                <section className="main__news news">
                    <article className="news__new new">
                        <h2 className="new__title">New 1</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/main2.jpeg'}/>
                        <p className="new__text">Description</p>
                    </article>
                    <article className="news__new new">
                        <h2 className="new__title">New 2</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/main3.jpeg'}/>
                        <p className="new__text">Description</p>
                    </article>
                    <article className="news__new new">
                        <h2 className="new__title">New 3</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/main4.jpeg'}/>
                        <p className="new__text">Description</p>
                    </article>
                    <article className="news__new new">
                        <h2 className="new__title">New 4</h2>
                        <img className="new__img" src={process.env.PUBLIC_URL + '/img/padelballs.jpg'}/>
                        <p className="new__text">Description</p>
                    </article>
                </section>
                <section className="main__speech speech">
                    <div className="speech__title">Find here all the info you need</div>
                    <div className="speech__description">Keep informed of the news, check your results, join our leagues and more!
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className="footer__footer-menu footer-menu">
                    <div className="footer-menu__about-us">About Us</div>
                    <div className="footer-menu__privacy">Privacy Policy</div>
                    <div className="footer-menu__contact-us">Contact us</div>
                    <div className="footer-menu__conditions">Conditions</div>
                </div>
                <div className="footer__others others">
                    <div className="others__copyright"> adricampo productions ©2019 </div>
                    <ul className="others__social-media social-media">
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-twitter-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-youtube-square"></i></a>
                        </li>
                        <li className="social-media__media-icon">
                            <a href="#"><i className="fab fa-pinterest-square"></i></a>
                        </li>
                    </ul>
                </div>
            </footer>
    </>
})