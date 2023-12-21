export default async (url) => {
    const baseUrl = `https://rickandmortyapi.com/api/`
        const res = await fetch(`${baseUrl + url}`)
        return await res.json()
}