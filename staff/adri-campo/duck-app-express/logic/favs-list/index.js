const call = require('../../helpers/call')
const validate = require('../../utils/validate')

module.exports = function (id, token) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)

    return new Promise((resolve, reject) => {  debugger
        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, user => {
                    if (user.error) return reject(new Error(user.error))
                    else {
                        const {favs} = user.data
                            if (favs) {  
                                Promise.all( favs.map (fav => { 
                                    return new Promise((resolve, reject) => {
                                        if (typeof fav === 'string') { 
                                            const url = `https://duckling-api.herokuapp.com/api/ducks/${fav}`
                                            call('GET', undefined, url, undefined, result => {
                                                if (result.error) return reject(error = new Error(result.error))  
                                                result.isFav = true
                                                result.image = result.imageUrl
                                                delete result.imageUrl

                                                resolve(result)
                                                
                                            })
                                        }
                                    })
                        
                            }))

                        .then(ducks => resolve(ducks))
                        
                        }
                    }          
        })

    })

}

