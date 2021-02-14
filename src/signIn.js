import { protocol, host, appId, clientId, redirectUrl } from './configure'
import ffetch from './fetch'

async function signIn() {
    const state = 'abc' // TODO randomize
    
    // TODO Fetch custom domain for app id
    var customDomain = null
    try {
        var domainRes = await ffetch(`https://api.login.page/domains?app_id=${appId}`)
        domainRes = await domainRes.json()
        customDomain = domainRes.name
    } catch (e) {
        console.log(e)
    }
    
    // Redirect to the custom domain
    if (customDomain) {
        window.location.replace(`${protocol}${customDomain}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
    } else {
        window.location.replace(`${protocol}${appId}.${host}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
    }
}

export default signIn