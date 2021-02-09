import { getIdToken, parseUserFromIdToken } from './utils'

async function getCurrentUser(context) {
    var idToken = getIdToken(context)
    try {
        return await parseUserFromIdToken(idToken)
    } catch (e) {
        console.log(e)
    }
    return null
}

export default getCurrentUser
