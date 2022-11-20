export const getJson = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw Error(`Fetch failed for ${url}`)
    }
    return await response.json()
}

