const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (leagueId, teamId) {
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)

    return (async () => {
        const res = await call(`${API_URL}/${leagueId}/team/${teamId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            }
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}