function signOut(callback) {
    const cookies = require('cookie-cutter')
    cookies.set('auth-idtoken', '', { expires: new Date(0) })
    localStorage.remoteItem('auth-session')
    if (callback) callback()
}

export default signOut