import { protocol, host } from './configure'
import getCurrentUser from './getCurrentUser'
import { getIdToken } from './utils'
import ffetch from './fetch'

async function listKeyPairs(context) {
    try {
        const idToken = getIdToken(context)
        const res = await ffetch(`${protocol}api.${host}/keys`, {
            headers: {
                'Authorization': 'Bearer ' + idToken,
            }
        })
        return await res.json()
    } catch (e) {
        console.log(e)
        throw e
    }
}

export default listKeyPairs
