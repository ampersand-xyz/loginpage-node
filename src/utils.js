import { protocol, host } from './configure'
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

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

export { 
    parseUserFromIdToken,
}