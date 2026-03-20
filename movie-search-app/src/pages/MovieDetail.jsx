import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const API_KEY = '56dffb12'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        )
        const data = await res.json()

        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError('Movie not found!')
        }
      } catch (err) {
        setError('Something went wrong!')
      }
      setLoading(false)
    }

    fetchMovie()
  }, [id])

 
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
      <CircularProgress sx={{ color: '#f5c518' }} size={60} />
    </div>
  )

  
  if (error) return (
    <div style={{ textAlign: 'center', marginTop: '150px' }}>
      <Typography variant="h5" sx={{ color: '#f5c518' }}>❌ {error}</Typography>
      <Button
        onClick={() => navigate(-1)}
        sx={{ color: '#f5c518', marginTop: '20px' }}
      >
         Go Back
      </Button>
    </div>
  )

  const poster = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x445?text=No+Image'

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>

      {/* MUI Back Button */}
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{
          backgroundColor: '#f5c518',
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '30px',
          textTransform: 'none',
          '&:hover': { backgroundColor: '#d4a800' }
        }}
      >
      Back
      </Button>

      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

       
        <img
          src={poster}
          alt={movie.Title}
          style={{
            width: '280px',
            borderRadius: '12px',
            objectFit: 'cover',
            border: '2px solid #f5c518'
          }}
        />

        {/* Details */}
        <div style={{ flex: 1, minWidth: '250px' }}>

          <Typography variant="h4" sx={{ color: '#f5c518', fontWeight: 'bold', marginBottom: '12px' }}>
            {movie.Title}
          </Typography>

          <Typography sx={{ color: 'gray', marginBottom: '16px', fontSize: '15px' }}>
            📅 {movie.Year} &nbsp;|&nbsp; ⏱️ {movie.Runtime} &nbsp;|&nbsp; 🔫 {movie.Genre}
          </Typography>

          <Typography sx={{ color: '#f5c518', fontSize: '20px', marginBottom: '16px', fontWeight: 'bold' }}>
            ⭐ IMDB: {movie.imdbRating} / 10
          </Typography>

          <Typography sx={{ color: 'white', marginBottom: '14px', lineHeight: 1.7 }}>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>Plot: </span>
            {movie.Plot}
          </Typography>

          <Typography sx={{ color: 'white', marginBottom: '10px' }}>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>Director: </span>
            {movie.Director}
          </Typography>

          <Typography sx={{ color: 'white', marginBottom: '10px' }}>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>Cast: </span>
            {movie.Actors}
          </Typography>

          <Typography sx={{ color: 'white', marginBottom: '10px' }}>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>Language: </span>
            {movie.Language}
          </Typography>

          <Typography sx={{ color: 'white' }}>
            <span style={{ color: '#f5c518', fontWeight: 'bold' }}>Country: </span>
            {movie.Country}
          </Typography>

        </div>
      </div>
    </div>
  )
}

export default MovieDetail