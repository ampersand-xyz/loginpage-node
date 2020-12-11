import { notifyObservers } from './observers'
import { updateAuthState } from './utils'

async function signOut() {
    try {
        await updateAuthState(tokens)
    } catch (e) {
        console.log(e)
    }
}

export default signOut