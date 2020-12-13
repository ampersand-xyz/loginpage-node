import { protocol, host } from './configure'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import { notifyObservers } from './observers'

async function parseUserFromIdToken(idToken) {
    if (!idToken) return null
    const header = jwt_decode(idToken, { header: true });
    const keyId = header.kid
    const res = await fetch(`${protocol}www.${host}/api/.well-known/pem/${keyId}`)
    const pubKeys = await res.json()
    const pubKey = pubKeys[keyId]
    const parsedToken = jwt.verify(idToken, pubKey, { algorithms: ['RS256'] })
    return {
        id: parsedToken.sub,
        email: parsedToken.email,
        isEmailVerified: parsedToken.email_verified,
        accountId: parsedToken.acc,
        accounts: parsedToken.accs,
    }
}

async function updateAuthState(authState) {
    const cookies = require('cookie-cutter')
    if (authState) {
        cookies.set('auth-idtoken', authState.id_token)
        localStorage.setItem('auth-session', JSON.stringify(authState))
    } else {
        cookies.set('auth-idtoken', '', { expires: new Date(0) })
        localStorage.removeItem('auth-session')
    }

    var currentUser = null
    try {
        if (authState) currentUser = await parseUserFromIdToken()
    } catch (e) {
        console.log(e)
    }
    notifyObservers(currentUser)
}

export {
    parseUserFromIdToken,
    updateAuthState,
}