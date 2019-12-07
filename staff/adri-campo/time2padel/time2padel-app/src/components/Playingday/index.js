import React from 'react'
import './index.sass'
export default function ({playingDay}) { 
    const { matches } = playingDay 
    console.log(matches)
    return <> <div className="playingday">
                <h2 className="playingday__title">PLAYING DAY</h2>
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[0].teams[0].title} VS {matches[0].teams[1].title}</p>
                </div>
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[1].teams[0].title} VS {matches[1].teams[1].title}</p>
                </div>
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[2].teams[0].title} VS {matches[2].teams[1].title}</p>
                </div>
            </div>  
        </>
}