import { useState } from "react"
import { searchMovies } from "../api/tmdb"
import { Link } from "react-router-dom"

interface Movie {
    id: number,
    title: string,
    poster_path: string | null
}

const Search = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async () => {
        if (!query.trim()) return
        setLoading(true)
        setError(null)
        try {
            const data = await searchMovies(query)
            setResults(data.results)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <h2>Search a movie</h2>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Insert name of movie" />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {results.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Search