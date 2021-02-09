import { parseUserFromIdToken } from './utils'

async function getCurrentUser(context) {

    // Get ID token from runtime/context
    var idToken
    if (context) {
        const Cookies = require('cookies')
        const cookies = new Cookies(context.req, context.res)
        idToken = cookies.get('auth-idtoken')
    } else if (localStorage !== undefined) {
        const authState = JSON.parse(localStorage.getItem('auth-session'))
        if (!authState) return null
        idToken = authState.id_token
    } else {
        return null
    }

    // Parse user from ID token
    try {
        return await parseUserFromIdToken(idToken)
    } catch (e) {
        console.log(e)
    }

    return null
}

export default getCurrentUser
