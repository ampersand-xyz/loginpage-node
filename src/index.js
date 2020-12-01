import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import { parse } from 'uuid'

var idpBaseUrl = 'https://loginpage.onrender.com'
var clientId = null
var redirectSignIn = null
var redirectSignOut = null

function configure(cfg) {
    clientId = cfg.clientId
    redirectSignIn = cfg.redirectSignIn
    redirectSignOut = cfg.redirectSignOut
    if (cfg.baseUrl) idpBaseUrl = cfg.baseUrl
}

function signIn() {
    const state = 'abc' // TODO randomize
    window.location.replace(`${idpBaseUrl}/m?clientId=${clientId}&redirectUri=${redirectSignIn}&state=${state}`)
}

function signOut() {
    // TODO
}

function useCurrentUser() {

    const [authState, setAuthState] = useState({
        currentUser: null,
        loading: true,
    })

    useEffect(() => {
        getCurrentUser()
            .then(currentUser => {
                setAuthState({
                    currentUser,
                    loading: false,
                })
            })
            .catch(e => {
                console.log(e)
                setAuthState({
                    currentUser: null,
                    loading: false,
                })
            })
    }, [])

    return { ...authState }
}

async function getCurrentUser() {
    const authSession = JSON.parse(localStorage.getItem('auth-session'))
    if (!authSession) return null
    try {
        return await parseUserFromIdToken(authSession.id_token)
    } catch (e) {
        console.log(e)
    }
    return null
}

async function getCurrentUserSSR(context) {
    const Cookies = require('cookies')
    const cookies = new Cookies(context.req, context.res)
    const idToken = cookies.get('auth-idtoken')
    if (!idToken) return null
    try {
        return await parseUserFromIdToken(idToken) 
    } catch (e) {
        console.log(e)
    }
    return null
}

async function parseUserFromIdToken(idToken) {
    const header = jwt_decode(idToken, { header: true });
    const keyId = header.kid
    const res = await fetch(`${idpBaseUrl}/api/.well-known/pem/${keyId}`)
    const pubKeys = await res.json()
    const pubKey = pubKeys[keyId]
    const parsedToken = jwt.verify(idToken, pubKey, { algorithms: ['RS256'] })
    return {
        id: parsedToken.sub,
        email: parsedToken.email,
        isEmailVerified: parsedToken.email_verified,
    }
}

function useRedirect(callback) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const state = urlParams.get('state')
        const code = urlParams.get('code')
        const grantType = 'authorization_code'

        // TODO verify state

        fetch(`${idpBaseUrl}/api/token?grant_type=${grantType}&code=${code}&redirect_uri=${redirectSignIn}&client_id=${clientId}`)
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

const Auth = {
    configure,
    signIn,
    signOut,
    useCurrentUser,
    getCurrentUser,
    getCurrentUserSSR,
    useRedirect,
}

export default Auth
