import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'https://www.omdbapi.com?apikey=32ca4c26'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    searchMovies('The Last')
  }, []);

    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json();

      setMovies(data.Search)
    }

  return (
    <div className='app'>
      <h1>MovieDatabase</h1>

      <div className='search'>
        <input 
        placeholder='Search for Movies...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon}
             alt="search"
             onClick={() => searchMovies(searchTerm)}
             />
      </div>

      {
        movies?.length > 0 ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )}
    </div>
  )
}

export default App