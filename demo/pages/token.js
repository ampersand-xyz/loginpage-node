import Auth from '@ampersand-xyz/loginpage'
import { useRouter } from 'next/router'

function TokenPage(props) {
    const router = useRouter()
    Auth.useRedirectHandler(() => router.replace('/profile'))
    return <div>Loading...</div>
}

export default TokenPage