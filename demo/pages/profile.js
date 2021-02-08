import Auth from '@ampersand-xyz/loginpage'
import { useRouter } from 'next/router'

function ProfilePage(props) {

    const router = useRouter()

    const { loading, currentUser } = Auth.useCurrentUser()

    const ping = e => {
        e.preventDefault()
        fetch('/api/ping')
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    const signOut = e => {
        e.preventDefault()
        Auth.signOut().then(() => router.push('/'))
    }

    if (loading) return <div>Loading...</div>
    return (
        <div>
            {currentUser && <p>{currentUser.email}</p>}
            <button onClick={ping}>Ping</button>
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

export default ProfilePage