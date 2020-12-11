import { parseUserFromIdToken } from './utils'

async function getCurrentUser() {
    const authState = JSON.parse(localStorage.getItem('auth-session'))
    if (!authState) return null
    try {
        return await parseUserFromIdToken(authState.id_token)
    } catch (e) {
        console.log(e)
    }
    return null
}

export default getCurrentUser
