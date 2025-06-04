import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      <h2>Hello</h2>
    </>
  )
}

export default App
