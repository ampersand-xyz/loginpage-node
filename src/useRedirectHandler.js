import { useEffect } from 'react'
import { baseUrl, clientId, redirectUrl } from './configure'

function useRedirectHandler(callback) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const state = urlParams.get('state')
        const code = urlParams.get('code')
        const grantType = 'authorization_code'

        // TODO verify state

        fetch(`${baseUrl}/api/token?grant_type=${grantType}&code=${code}&redirect_uri=${redirectUrl}&client_id=${clientId}`)
            .then(res => res.json())
            .then(tokens => {

                // Save tokens to localstorage and cookies
                const cookies = require('cookie-cutter')
                cookies.set('auth-idtoken', tokens.id_token)
                localStorage.setItem('auth-session', JSON.stringify(tokens))
                if (callback) callback()
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
}

export default useRedirectHandler