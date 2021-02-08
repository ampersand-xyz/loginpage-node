import { protocol, host } from './configure'
import getCurrentUser from './getCurrentUser'
import { updateAuthState } from './utils'

async function changeAccount(accountId) {
    try {
        const authSession = JSON.parse(localStorage.getItem('auth-session'))
        const grantType = 'bearer_token'
        const res = await fetch(`${protocol}api.${host}/token?grant_type=${grantType}&account_id=${accountId}`, {
            headers: {
                'Authorization': 'Bearer ' + authSession.id_token,
            }
        })
        const tokens = await res.json()
        await updateAuthState(tokens)
        return tokens.id_token

    } catch (e) {
        console.log(e)
        throw e
    }
}

export default changeAccount
