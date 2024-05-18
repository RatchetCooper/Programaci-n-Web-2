@ -0,0 +1,150 @@
"use client";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input'; // Importar correctamente desde @mui/material/Input
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const SubmitRegister = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('fullName', fullName);
    formData.append('password', password);
    console.log(image);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Redirect to the landing page on successful registration
        window.location.href = '/Landing'; // Redirect using window.location
      } else {
        // Handle error messages
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  const theme = useTheme();
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
          Registro
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={SubmitRegister}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nameUser"
            label="Nombre completo"
            name="nameUser"
            autoComplete="name"
            autoFocus
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            margin="normal"
            required
            fullWidth
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageChange}
          />
          {imageURL && (
            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Imagen seleccionada:</Typography>
              <img src={imageURL} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
          )}
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
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"¿Tienes una cuenta? Inicia sesión"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}