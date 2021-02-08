import '../styles/globals.css'
import Auth from '@ampersand-xyz/loginpage'
import { useRouter } from 'next/router'

Auth.configure({
    appId: '24f7471a-0ef8-41a2-946b-7d7bbf069d46',
    clientId: 'a8m38b78f49moav4ah8n894k',
    redirectUrl: 'localhost:3000/token',
})

function MyApp({ Component, pageProps }) {
    return (
        <AuthWall>
            <Component {...pageProps} />
        </AuthWall>
    )
}

function AuthWall(props) {
    const router = useRouter()
    const { loading, currentUser } = Auth.useCurrentUser()
    if (!loading && !currentUser) {
        if (router.pathname !== '/' && router.pathname !== '/token') {
            router.push('/')
        }
    }
    return props.children
}


export default MyApp
