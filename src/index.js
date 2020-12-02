import configure from './configure'
import getCurrentUser from './getCurrentUser'
import getCurrentUserSSR from './getCurrentUserSSR'
import signIn from './signIn'
import signOut from './signOut'
import useCurrentUser from './useCurrentUser'
import useRedirectHandler from './useRedirectHandler'

const Auth = {
    configure,
    getCurrentUser,
    getCurrentUserSSR,
    signIn,
    signOut,
    useCurrentUser,
    useRedirectHandler,
}

export default Auth
