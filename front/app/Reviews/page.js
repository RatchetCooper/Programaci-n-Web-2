"use client"
import Avatar from '@mui/material/Avatar';
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
import { Stack, CardMedia } from "@mui/material";
import { Rating } from 'react-simple-star-rating'
import {createReview} from '../services/reviewServices'


export default function Login(){
    const theme = useTheme();
    const [rating, setRating] = useState(0)
    const [ ReviewUser, setReview] = useState("") 

    const handleRating = (rate) => {
      setRating(rate)
      console.log(rating)
      // other logic
    }

    const UserPostReviewChange = (e) => setReview(e.target.value)

    const SubmitReview = ()=> {
      console.log("comentario" + ReviewUser )
      const ReviewData = { rating, ReviewUser}
      createReview(ReviewData)
  }
    return(
      <>
      <Typography variant="h4">Calificaciones</Typography>
        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
          <CardMedia sx={{ borderRadius: '50%', width: '200px', height: '200px' }}
              image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
              title="Card img">
          </CardMedia>
          <Typography variant="body"> Nombre del usuario</Typography>          
        </Stack>
        <Rating
        onClick={handleRating}
       
        /* Available Props */
      />
        <Typography variant="h4">Comentarios</Typography> 
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        
      <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          onChange={ UserPostReviewChange }
          //defaultValue="Default Value"
        />
        </div>
    </Box>       
        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}}>
          <Button variant="contained" sx={{mb: 4}} onClick={ SubmitReview }>Enviar</Button>
          <Button variant="contained" sx={{mb: 4}}>Cancelar</Button>
        </Stack>
        </>
    )
}