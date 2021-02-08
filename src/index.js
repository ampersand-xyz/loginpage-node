import authorize from './authorize'
import changeAccount from './changeAccount'
import configure from './configure'
import getCurrentUser from './getCurrentUser'
import getCurrentUserSSR from './getCurrentUserSSR'
import signIn from './signIn'
import signOut from './signOut'
import useCurrentUser from './useCurrentUser'
import useRedirectHandler from './useRedirectHandler'

const Auth = {
    authorize,
    changeAccount,
    configure,
    getCurrentUser,
    getCurrentUserSSR,
    signIn,
    signOut,
    useCurrentUser,
    useRedirectHandler,
}

export default Auth
