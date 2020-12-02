import { baseUrl, clientId, redirectUrl } from './configure'

function signIn() {
    const state = 'abc' // TODO randomize
    window.location.replace(`${baseUrl}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
}

export default signIn