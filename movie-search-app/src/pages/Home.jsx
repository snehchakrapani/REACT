import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

const API_KEY = '56dffb12'

function Home() {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // jab bhi search badlega, movies fetch hongi
  useEffect(() => {
    if (search.trim() === '') {
      setMovies([])
      return
    }

    async function fetchMovies() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
        )
        const data = await res.json()

        if (data.Response === 'True') {
          setMovies(data.Search)
        } else {
          setMovies([])
          setError('No movies found!')
        }
      } catch (err) {
        setError('Something went wrong!')
      }
      setLoading(false)
    }

    // 500ms wait karo phir fetch karo
    // (har keystroke pe request nahi jayegi)
    const timer = setTimeout(fetchMovies, 500)
    return () => clearTimeout(timer)

  }, [search])

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>

      {/* Title */}
      <h1 style={{ textAlign: 'center', color: '#e94560', marginBottom: '30px', fontSize: '2.5rem' }}>
        🎬 Movie Search
      </h1>

      {/* Search Input */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <input
          type="text"
          placeholder="Search any movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '14px 20px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '2px solid #0f3460',
            backgroundColor: '#16213e',
            color: 'white',
            outline: 'none'
          }}
        />
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}>
          ⏳ Searching...
        </p>
      )}

      {/* Error */}
      {error && (
        <p style={{ textAlign: 'center', color: '#e94560', fontSize: '18px' }}>
          ❌ {error}
        </p>
      )}

      {/* Default message */}
      {!loading && movies.length === 0 && search === '' && (
        <p style={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}>
          🎥 Type a movie name to search!
        </p>
      )}

      {/* Movies Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

    </div>
  )
}

export default Home