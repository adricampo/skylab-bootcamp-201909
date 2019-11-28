const { model } = require('mongoose')
const { user, league, team } = require('./schemas')

module.exports = {
    User: model('User', user),
    League: model('League', league),
    // Request: model('Request', request),
    Team: model('Team', team)
}