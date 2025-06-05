import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMovieDetails } from "../api/tmdb"
import { useFavorites } from "../context/FavoritesContext"

interface MovieDetails {
    id: number
    title: string
    overview: string
    poster_path: string | null
    release_date: string
}

const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState<MovieDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    const favorite = movie && isFavorite(movie.id)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                if (id) {
                    const data = await getMovieDetails(id)
                    setMovie(data)
                }
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [id])
    if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>
    if (error) return <p className="text-red-600 text-center mt-8">{error}</p>
    if (!movie) return <p className="text-center mt-8">Movie was not found</p>
    return (
        <>
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-xl overflow-hidden">
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full md:w-1/3 object-cover" />
                    )}
                    <div className="flex flex-col justify-between p-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                            <p className="text-sm text-gray-500 mb-4"><strong>Release data:</strong> {movie.release_date}</p>
                            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
                        </div>
                        <button
                            onClick={() =>
                                movie &&
                                (favorite
                                    ? removeFavorite(movie.id)
                                    : addFavorite({ id: movie.id, title: movie.title, poster_path: movie.poster_path }))
                            }

                            className={`mt-6 px-4 py-2 rounded-lg transition font-semibold
                                ${favorite
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {favorite ? 'Delete from favorite' : 'Add to favorite'}
                        </button>
                    </div>
                </div>
            </div>

        </>
    )

}

export default MovieDetails