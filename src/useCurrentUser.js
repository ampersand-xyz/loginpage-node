import { useEffect, useState } from 'react'

function useCurrentUser() {
    const [authState, setAuthState] = useState({
        currentUser: null,
        loading: true,
    })

    useEffect(() => {
        getCurrentUser()
            .then(currentUser => {
                setAuthState({
                    currentUser,
                    loading: false,
                })
            })
            .catch(e => {
                setAuthState({
                    currentUser: null,
                    loading: false,
                })
            })
    }, [])

    return { ...authState }
}

export default useCurrentUser