import Auth from '@ampersand-xyz/loginpage'
import { useRouter } from 'next/router'

function ProfilePage(props) {

    const router = useRouter()

    const { loading, currentUser } = Auth.useCurrentUser()

    const signOut = e => {
        e.preventDefault()
        Auth.signOut().then(() => router.push('/'))
    }

    if (loading) return <div>Loading...</div>
    return (
        <div>
            {currentUser && <p>{currentUser.email}</p>}
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

export default ProfilePage