import { protocol, host } from './configure'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import { notifyObservers } from './observers'
import ffetch from './fetch'

function getIdToken(context) {
    var idToken
    if (context) {
        const Cookies = require('cookies')
        const cookies = new Cookies(context.req, context.res)
        idToken = cookies.get('auth-idtoken')
    } else if (typeof localStorage !== undefined) {
        const authState = JSON.parse(localStorage.getItem('auth-session'))
        if (!authState) return null
        idToken = authState.id_token
    }
    return idToken
}

async function parseUserFromIdToken(idToken) {
    if (!idToken) return null
    const header = jwt_decode(idToken, { header: true });
    const keyId = header.kid
    var pubKey
    if (typeof localStorage !== 'undefined') {
        const pubKeys = JSON.parse(localStorage.getItem(`auth-pubkeys`))
        if (pubKeys) pubKey = pubKeys[keyId]
    }
    if (!pubKey) {
        const pubKeysRes = await ffetch(`${protocol}api.${host}/.well-known/pem/${keyId}`)
        const pubKeys = await pubKeysRes.json()
        pubKey = pubKeys[keyId]
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('auth-pubkeys', JSON.stringify(pubKeys))
        }
    }
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
    getIdToken,
    parseUserFromIdToken,
    updateAuthState,
}