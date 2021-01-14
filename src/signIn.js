import { protocol, host, appId, clientId, redirectUrl } from './configure'

async function signIn() {
    const state = 'abc' // TODO randomize
    
    // TODO Fetch custom domain for app id
    var customDomain = null
    try {
        var domainRes = await fetch(`https://www.login.page/api/domains?app_id=${appId}`)
        domainRes = await domainRes.json()
        customDomain = domainRes.domain
    } catch (e) {
        // Do nothing
    }
    
    // Redirect to the custom domain
    if (customDomain) {
        window.location.replace(`${protocol}${customDomain}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
    } else {
        window.location.replace(`${protocol}${appId}.${host}/m?clientId=${clientId}&redirectUri=${redirectUrl}&state=${state}`)
    }
}

export default signIn