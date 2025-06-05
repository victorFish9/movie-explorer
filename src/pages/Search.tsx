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
            <h2 className="text-2xl font-bold mb-2">Search a movie</h2>
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Insert name of movie"
                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button type="submit" onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {results.map((movie) => (
                        <div key={movie.id} className="bg-white shadow-md rounded-xl overflow-hidden">
                            <Link to={`/movie/${movie.id}`}>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-72 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </ul>

        </div>
    )
}

export default Search