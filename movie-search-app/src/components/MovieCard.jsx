import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function MovieCard({ movie }) {
  const navigate = useNavigate()

  const poster = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x445?text=No+Image'

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      sx={{
        backgroundColor: '#1a1a1a',
        cursor: 'pointer',
        border: '1px solid #2a2a2a',
        borderRadius: '10px',
        transition: 'transform 0.2s, border-color 0.2s',
        '&:hover': {
          transform: 'scale(1.04)',
          border: '1px solid #f5c518',
        }
      }}
    >
     
      <CardMedia
        component="img"
        image={poster}
        alt={movie.Title}
        sx={{ height: '300px', objectFit: 'cover' }}
      />

      {/* Movie Info */}
      <CardContent sx={{ padding: '12px' }}>
        <Typography
          variant="body2"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          
          }}
        >
          {movie.Title}
        </Typography>
        <Typography variant="caption" sx={{ color: '#f5c518' }}>
          📅 {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MovieCard