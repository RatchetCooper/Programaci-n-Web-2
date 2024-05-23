"use client";import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CookieManager from '../Cookies/Cookies.js';
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const SubmitLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName, password: password })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Set cookie for user ID
        CookieManager.setCookie('id', data.userId, 365); // Set cookie with user ID that lasts for 365 days
  
        // Redirect to the landing page on successful login
        window.location.href = '/Landing'; // Redirect using window.location
      } else {
        // Handle error messages
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  useEffect(() => {
    SubmitLogin(); // Submit login on component mount
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={SubmitLogin}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
