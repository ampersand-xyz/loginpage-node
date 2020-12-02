import { parseUserFromIdToken } from './utils'

async function getCurrentUserSSR(context, path) {
    try {
        const Cookies = require('cookies')
        const cookies = new Cookies(context.req, context.res)
        const idToken = cookies.get('auth-idtoken')
        const user = await parseUserFromIdToken(idToken)
        if (!user) redirect(context.res, path)
        return user

    } catch (e) {
        console.log(e)
        redirect(context.res, path)
        return null
    }
}

function redirect(res, path) {
    if (!res || !path) return
    res.statusCode = 302
    res.setHeader('Location', path)
}

export default getCurrentUserSSR