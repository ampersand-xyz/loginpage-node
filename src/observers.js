import getCurrentUser from './getCurrentUser'

var observers = []

const onStateChange = observer => {
    observers.push(observer)

    getCurrentUser()
        .then(user => observer(user))
        .catch(e => console.log(e))

    return () => {
        observers = observers.filter(o => o !== observers)
    }
}

const notifyObservers = async () => {
    return getCurrentUser()
        .then(currentUser => {
            observers.forEach(observer => observer(currentUser))
        })
        .catch(e => console.log(e))
}

export {
    onStateChange,
    notifyObservers,
}
