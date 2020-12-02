var baseUrl = 'https://loginpage.onrender.com'
var clientId = null
var redirectUrl = null

function configure(cfg) {
    if (cfg.baseUrl) baseUrl = cfg.baseUrl
    clientId = cfg.clientId
    redirectUrl = cfg.redirectUrl
}

export default configure
export { baseUrl, clientId, redirectUrl }
