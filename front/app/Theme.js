"use client"
import { createTheme } from '@mui/material/styles';

const navbarColor = '#131718';
const primaryColor = '#262642';
const secondaryColor = '#232627';
const cardColor = '#272640';
const cardText = '#ffffff';
const cardFilterColor = '#141718';

const theme = createTheme({
    palette: {
        text: {secondary: cardText},
        primary: {main: primaryColor},
        secondary: {main: secondaryColor},
        cardBg: {main: cardColor},
        cardText: {main: cardText},
        cardFilterColor: {main: cardFilterColor}
    }
}); 

export default theme //exporto el objeto tema