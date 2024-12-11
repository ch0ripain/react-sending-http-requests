export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')
    const responseData = await response.json()

    if (!response.ok) {
        throw new Error('Error fetching places data.')
    }

    return responseData.places
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-placess', {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const responseData = await response.json()

    if (!response.ok) {
        throw new Error('Updating user places went wrong :(')
    }

    return responseData.message
}