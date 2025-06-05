import { createContext, useContext, useEffect, useState } from 'react'

export interface FavoriteMovie {
    id: number
    title: string
    poster_path: string | null
}

interface FavoritesContextType {
    favorites: FavoriteMovie[]
    addFavorite: (movie: FavoriteMovie) => void
    removeFavorite: (id: number) => void
    isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('favorites')
        if (stored) setFavorites(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorite = (movie: FavoriteMovie) => {
        if (!favorites.find((m) => m.id === movie.id)) {
            setFavorites([...favorites, movie])
        }
    }

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter((m) => m.id !== id))
    }

    const isFavorite = (id: number) => {
        return favorites.some((m) => m.id === id)
    }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext)
    if (!context) throw new Error('useFavorites must be used within a FavoritesProvider')
    return context
}