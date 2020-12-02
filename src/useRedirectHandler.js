import { useEffect } from 'react'
// const React = require('react')
import { baseUrl, clientId, redirectUrl } from './configure'

console.log('A')

function useRedirectHandler(callback) {
    console.log('B')

    useEffect(() => {

        console.log('C')

        const urlParams = new URLSearchParams(window.location.search)
        const state = urlParams.get('state')
        const code = urlParams.get('code')
        const grantType = 'authorization_code'
        
        console.log('D')

        // TODO verify state

        fetch(`${baseUrl}/api/token?grant_type=${grantType}&code=${code}&redirect_uri=${redirectUrl}&client_id=${clientId}`)
            .then(res => res.json())
            .then(tokens => {

                console.log('E')

                // Save tokens to localstorage and cookies
                const cookies = require('cookie-cutter')
                cookies.set('auth-idtoken', tokens.id_token)
                localStorage.setItem('auth-session', JSON.stringify(tokens))

                console.log('F')

                if (callback) callback()

                console.log('G')
            })
            .catch(err => {

                console.log('H')

                console.log(err)
            })

            console.log('I')
    }, [])
}

export default useRedirectHandler
