import { useEffect } from 'react'
import { protocol, host, clientId, redirectUrl } from './configure'
import { updateAuthState } from './utils'

function useRedirectHandler(callback) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const state = urlParams.get('state')
        const code = urlParams.get('code')
        const grantType = 'authorization_code'

        // TODO verify state

        fetch(`${protocol}www.${host}/api/token?grant_type=${grantType}&code=${code}&redirect_uri=${redirectUrl}&client_id=${clientId}`)
            .then(res => res.json())
            .then(tokens => updateAuthState(tokens))
            .then(() => {
                if (callback) callback()
            })
            .catch(err => {
                
                // TODO handle error
                console.log(err)
            })
    }, [])
}

export default useRedirectHandler
