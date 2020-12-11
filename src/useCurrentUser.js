import { useEffect, useState } from 'react'
import { onStateChange } from './observers'

function useCurrentUser() {
    const [authState, setAuthState] = useState({
        currentUser: null,
        loading: true,
    })

    useEffect(() => {
        const unsubscribe = onStateChange((u) => {
            if (JSON.stringify(u) !== JSON.stringify(authState.currentUser))
                setAuthState({ loading: false, currentUser: u })
            else if (authState.loading) setAuthState({ loading: false })
        })
        return () => unsubscribe()
    }, [])

    return { ...authState }
}

export default useCurrentUser
