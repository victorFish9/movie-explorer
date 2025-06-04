const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const searchMovies = async (query: string) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)

    if (!res.ok) {
        throw new Error('Error to get data from TMDB')
    }

    return res.json()
}

export const getMovieDetails = async (id: string) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)

    if (!res.ok) {
        throw new Error('Error to get info detail information of film')
    }

    return res.json()
}