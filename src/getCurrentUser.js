import { parseUserFromIdToken } from './utils'

async function getCurrentUser() {
    const authSession = JSON.parse(localStorage.getItem('auth-session'))
    if (!authSession) return null
    try {
        return await parseUserFromIdToken(authSession.id_token)
    } catch (e) {
        console.log(e)
    }
    return null
}

export default getCurrentUser
