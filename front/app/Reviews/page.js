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
import { createReview } from '../services/reviewServices'
import UserReviewsCard from "../components/UserReviewsCard";
import {Card} from "@mui/material";

export default function Reviews({ userCampaignReview }) {
  const theme = useTheme();
  const [rating, setRating] = useState(0)
  const [ReviewUser, setReview] = useState("")
  const userReviewsData = [{ "username": "Erika", "comentarios": "Test 1" }, { "username": "Juan", "comentarios": "Test 2" }]

  const handleRating = (rate) => {
    setRating(rate)
    console.log(rating)
    // other logic
  }

  const UserPostReviewChange = (e) => setReview(e.target.value)

  const SubmitReview = () => {
    console.log("comentario" + ReviewUser)
    const ReviewData = { rating, ReviewUser }
    createReview(ReviewData)
    console.log(ReviewData)
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 5, flexDirection: "column" }}>
            <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, width: '100vh' }}>
                <Stack spacing={2}>
                    <Typography variant="h1" sx={{ color: '#272640', fontWeight: 700, letterSpacing: '-1.44px' }}>
                        Calificaciones
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6c7275', textAlign: 'center', fontWeight: 600 }}>
                        Nombre de la campaña
                    </Typography>
                    <Box sx={{ backgroundColor: '#fff', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ width: '100%' }}>
                            <Avatar sx={{ width: 276, height: 276 }} src="..." alt="User Avatar" />
                            <Typography variant="h4" sx={{ color: '#272640', fontWeight: 700 }}>
                                Nombre de usuario que hizo el review
                            </Typography>
                        </Stack>
                        
                        <Box sx={{ mt: 4, width: '100%', p: 2, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ color: '#272640', fontWeight: 700 }}>
                                Comentario
                            </Typography>
                            <Box sx={{ mt: 2, width: '100%', border: 1, borderColor: 'rgba(0, 0, 0, 0.87)', borderRadius: 1, p: 2 }}>
                                <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Label
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    defaultValue="Input text"
                                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                                    sx={{ mt: 1, mb: 2 }}
                                />
                            </Box>
                        </Box>
                       <Stack direction="row" spacing={2} sx={{ mt: 2, width: '100%', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ background: 'linear-gradient(180deg, #5e5aae 0%, #36c5cd 100%)' }}>
                                Enviar
                            </Button>
                            <Button variant="contained" sx={{ background: 'linear-gradient(180deg, #5e5aae 0%, #36c5cd 100%)' }}>
                                Cancelar
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Card>
        </Box>
      {
        userReviewsData.map((usercampaign, index) => (
          <UserReviewsCard userReviewsData={usercampaign}></UserReviewsCard>
        ))
      }
    </>
  )
}