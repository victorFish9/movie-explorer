import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMovieDetails } from "../api/tmdb"

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
    if (loading) return <p>Laoding...</p>
    if (error) return <p style={{ color: 'red' }}>{error}</p>
    if (!movie) return <p>Film was not found:</p>

    return (
        <div>
            <h2>{movie.title}</h2>
            <p><strong>Release data:</strong> {movie.release_date}</p>
            <p>{movie.overview}</p>
            {movie.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title} />
            )}
        </div>
    )

}

export default MovieDetails