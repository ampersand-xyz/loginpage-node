import { protocol, host } from './configure'
import getCurrentUser from './getCurrentUser'

async function changeAccount(accountId) {
    try {
        console.log('A')
        const authSession = JSON.parse(localStorage.getItem('auth-session'))
        console.log('B')
        console.log(authSession)
        const grantType = 'bearer_token'
        const tokens = await fetch(`${protocol}www.${host}/api/token?grant_type=${grantType}&account_id=${accountId}`, {
            headers: {
                'Authorization': 'Bearer ' + authSession.id_token,
            }
        })
        console.log('C')
        console.log(tokens)

        // Save tokens to localstorage and cookies
        const cookies = require('cookie-cutter')
        cookies.set('auth-idtoken', tokens.id_token)
        console.log('D')
        localStorage.setItem('auth-session', JSON.stringify(tokens))
        console.log('E')
        return tokens.id_token

    } catch (e) {
        console.log(e)
        throw e
    }
}

export default changeAccount
