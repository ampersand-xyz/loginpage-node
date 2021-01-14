import { notifyObservers } from './observers'
import { updateAuthState } from './utils'

async function signOut() {
    try {
        await updateAuthState(null)
    } catch (e) {
        console.log(e)
    }
}

export default signOut