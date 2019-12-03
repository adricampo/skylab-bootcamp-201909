import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ handleGoToMainSignIn, handleGoToMainSignUp, error }) {
    return <section className="registration-page">
                <div className="registration-page__container container">
                    <section className="container__sign-in sign-in">
                        <h2 className="container__title">Sign In</h2>
                        <form className="sign-in__form" onSubmit={ event => {
                            event.preventDefault()

                            const { username: { value: username }, password: { value: password } } = event.target

                            handleGoToMainSignIn(username, password)   
                        }}>
                            <label for="username">Username: <input type="email" className="sign-in__name" name="username"/></label>
                            <label for="password">Password: <input type="password" className="sign-in__name" name="password"/></label>
                            <a href="#" className="link">Forgot your password?</a>
                            <div className="sign-in__button button">
                                <button className="button__registerbuttons">Sign In</button>
                            </div>
                        </form>
                    </section>
                    <section className="container__sign-up sign-up">
                        <h2 className="container__title">Create a new account</h2>
                        <p className="sign-up__text">Register and create an account to be part of our Padel Fam!</p>
                        <form className="sign-up__form" onSubmit={ event => {
                            event.preventDefault()

                            const { name: { value: name }, surname: { value: surname }, username: { value: username }, gender: { value: gender }, email: { value: email }, password: { value: password } } = event.target

                            handleGoToMainSignUp(name, surname, username, gender, email, password )
                        }}>
                            <label for="name">Name: <input type="text" className="sign-up__name" name="name"/></label>
                            <label for="surname">Surname: <input type="text" className="sign-up__name" name="surname"/></label>
                            <label for="username">Username: <input type="email" className="sign-up__name" name="username"/></label>
                            <label for="gender">Gender: <input type="radio" className="sign-up__name" name="gender" value="Male"/> Male<input type="radio" className="sign-up__name" name="gender" value="Female"/> Female</label>
                            <label for="email">Email: <input type="email" className="sign-up__name" name="email"/></label>
                            <label for="password">Password: <input type="password" className="sign-up__name" name="password"/></label>
                            <div className="sign-up__button button">
                                <button className="button__registerbuttons">Sign Up</button>
                            </div>
                        </form>
                    </section>
                </div>

                {error && <Feedback message={error} />}
            </section>  
}