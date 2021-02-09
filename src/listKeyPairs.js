import { protocol, host } from './configure'
import getCurrentUser from './getCurrentUser'
import { updateAuthState } from './utils'

async function listKeyPairs() {
    try {
        const res = await fetch(`${protocol}api.${host}/keys`, {
            headers: {
                'Authorization': 'Bearer ' + authSession.id_token,
            }
        })
        return await res.json()
    } catch (e) {
        console.log(e)
        throw e
    }
}

export default listKeyPairs
