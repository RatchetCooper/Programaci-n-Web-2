"use client"
import Avatar from '@mui/material/Avatar';
/*var mysql = require("mysql");*/
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation'

export default function Login(){
    const theme = useTheme();
    
    
    const [ UserName, setUserName] = useState("")
    const [ Password, setPassword] = useState("")
    const router = useRouter()
    const UserNameChange = (e) => setUserName(e.target.value)
    const PasswordChange = (e) => setPassword(e.target.value)
    
    const SubmitLogin = ()=> {
        console.log("username" + UserName)
        console.log("password" + Password)
    }

    const responseMessage = (response) => {
      //base de datos
      router.push('/Landing', { scroll: false })
      console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

   
   
    
    return(
        
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
              onChange={ UserNameChange }
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
              onChange={ PasswordChange }
            />
            
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={ SubmitLogin }
            >
              Iniciar sesión
            </Button>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"¿No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    
    )
}