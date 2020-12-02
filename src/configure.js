var protocol = 'https://'
var host = 'loginpage.onrender.com'
var appId = null
var clientId = null
var redirectUrl = null

function configure(cfg) {
    if (cfg.protocol) protocol = cfg.protocol
    if (cfg.host) host = cfg.host
    appId = cfg.appId
    clientId = cfg.clientId
    redirectUrl = cfg.redirectUrl
}

export default configure
export { protocol, host, appId, clientId, redirectUrl }
