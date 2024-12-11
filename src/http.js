export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')
    const responseData = await response.json()

    if (!response.ok) {
        throw new Error('Error fetching places data.')
    }

    return responseData.places
}
