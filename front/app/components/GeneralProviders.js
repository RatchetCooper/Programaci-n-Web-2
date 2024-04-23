"use client"
import { ThemeProvider } from '@mui/material/styles'; //Contexto
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme } from '@mui/material/styles';
import theme1 from '../Theme.js'; // ruta correcta a tu archivo Theme.js

export default function GeneralProviders({children}){
    const theme = useTheme();
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GoogleOAuthProvider clientId="862893519032-2oupdld0qpkck0fk4rp29otd6gf3v7jq.apps.googleusercontent.com">
                <ThemeProvider theme={ theme1 }>
                {children}
                </ThemeProvider>
            </GoogleOAuthProvider>
        </LocalizationProvider>
    );
}
