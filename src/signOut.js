import { notifyObservers } from './observers'
import { updateAuthState } from './utils'

async function signOut() {
    // const cookies = require('cookie-cutter')
    // cookies.set('auth-idtoken', '', { expires: new Date(0) })
    // localStorage.removeItem('auth-session')
    // notifyObservers()
    try {
        await updateAuthState(tokens)
    } catch (e) {
        console.log(e)
    }
    // updateAuthState(null)
    // if (callback) callback()

    return 
}

export default signOut