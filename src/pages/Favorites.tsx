import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
    const { favorites } = useFavorites()

    if (favorites.length === 0) {
        return <p>You don't have favorites</p>
    }

    return (
        <>
            <h2>Favorite movies</h2>
            <ul>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {favorites.map((movie) => (
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

        </>
    )
}

export default Favorites