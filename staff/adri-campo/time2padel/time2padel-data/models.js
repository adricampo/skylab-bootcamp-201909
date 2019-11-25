const { model } = require('mongoose')
const { user, league, request, teams } = require('./schemas')

module.exports = {
    User: model('User', user),
    League: model('League', league),
    Request: model('Request', request),
    Teams: model('Teams', teams)
}