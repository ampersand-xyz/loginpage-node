import { useEffect, useState } from 'react'
import { onStateChange } from './observers'

function useCurrentUser() {
    const [authState, setAuthState] = useState({
        currentUser: null,
        loading: true,
    })

    useEffect(() => {
        const unsubscribe = onStateChange((u) => {
            if (JSON.stringify(u) !== JSON.stringify(state.currentUser))
                setState({ isLoading: false, currentUser: u })
            else if (state.loading) setState({ loading: false })
        })
        return () => unsubscribe()
    }, [])

    return { ...authState }
}

export default useCurrentUser
