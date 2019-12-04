import React from 'react'
import './index.sass'

export default function ({}) {
    return <>
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
    </>
}