import { protocol, host, appId, clientId, redirectUrl } from './configure'

function signIn() {
    const state = 'abc' // TODO randomize
    window.location.replace(`${protocol}${appId}.${host}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
}

export default signIn