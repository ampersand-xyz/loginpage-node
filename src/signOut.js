function signOut(callback) {
    const cookies = require('cookie-cutter')
    cookies.set('auth-idtoken', '', { expires: new Date(0) })
    localStorage.removeItem('auth-session')
    if (callback) callback()
}

export default signOut