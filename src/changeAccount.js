import { protocol, host } from './configure'
import getCurrentUser from './getCurrentUser'

async function changeAccount(accountId) {
    try {
        const authSession = JSON.parse(localStorage.getItem('auth-session'))
        const grantType = 'bearer_token'
        const tokens = fetch(`${protocol}www.${host}/api/token?grant_type=${grantType}&account_id=${accountId}`, {
            headers: {
                'Authorization': 'Bearer ' + authSession.id_token,
            }
        })

        // Save tokens to localstorage and cookies
        const cookies = require('cookie-cutter')
        cookies.set('auth-idtoken', tokens.id_token)
        localStorage.setItem('auth-session', JSON.stringify(tokens))

        return tokens.id_token

    } catch (e) {
        console.log(e)
        throw e
    }
}

export default changeAccount
