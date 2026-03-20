import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleLogin() {
    let valid = true
    if (email === '') { setEmailError('Email is required!'); valid = false }
    else if (!email.includes('@')) { setEmailError('Enter a valid email!'); valid = false }
    else setEmailError('')

    if (password === '') { setPasswordError('Password is required!'); valid = false }
    else if (password.length < 6) { setPasswordError('Minimum 6 characters!'); valid = false }
    else setPasswordError('')

    if (valid) onLogin()
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#1a1a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Typography variant="h3" sx={{ color: '#e94560', fontWeight: 'bold', marginBottom: '10px' }}>
        📝 Todo App
      </Typography>

      <Typography variant="body1" sx={{ color: 'gray', marginBottom: '30px' }}>
        Login to manage your tasks
      </Typography>

      <Paper elevation={0} sx={{ width: '100%', maxWidth: '400px', backgroundColor: '#16213e', border: '1px solid #0f3460', borderRadius: '12px', padding: '40px' }}>

        <Typography variant="h5" align="center" sx={{ color: 'white', fontWeight: 'bold', marginBottom: '24px' }}>
          Welcome Back 👋
        </Typography>

        <TextField
          fullWidth label="Email" type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
          error={emailError !== ''} helperText={emailError}
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: '#0f3460' }, '&:hover fieldset': { borderColor: '#e94560' }, '&.Mui-focused fieldset': { borderColor: '#e94560' } },
            '& .MuiInputLabel-root': { color: 'gray' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#e94560' },
          }}
        />

        <TextField
          fullWidth label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
          error={passwordError !== ''} helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'gray' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            marginBottom: '30px',
            '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: '#0f3460' }, '&:hover fieldset': { borderColor: '#e94560' }, '&.Mui-focused fieldset': { borderColor: '#e94560' } },
            '& .MuiInputLabel-root': { color: 'gray' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#e94560' },
          }}
        />

        <Button fullWidth variant="contained" size="large" onClick={handleLogin}
          sx={{ backgroundColor: '#e94560', '&:hover': { backgroundColor: '#c73652' }, textTransform: 'none', fontSize: '16px', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
          Login
        </Button>

        <Typography align="center" variant="body2" sx={{ color: 'gray' }}>
          Don't have an account?{' '}
          <span style={{ color: '#e94560', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => alert('Sign up coming soon!')}>
            Sign Up
          </span>
        </Typography>

      </Paper>
    </Box>
  )
}