"use client"
import { Box,Button, Card, Stack, CardMedia, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { useRouter } from 'next/navigation'

export default function UserCampaignsItemParticipants({userItemParticipant} ){
    const theme = useTheme();
    const router = useRouter();

    const dejarReview = () => {
        console.log("Entrando a la funcion")
        router.push('/Reviews', { scroll: false }); // Cambia la URL a '/Reviews'
       
    };
    return(
        <>
        
        <Grid container spacing={2} sx={{ }} >
       
                <Grid item xs={6}>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}}  >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">{userItemParticipant.username}</Typography>
                        
                    </Stack>
                
                </Grid>
               
                <Grid item xs={6}>
                <Button variant="contained" sx={{mb: 4}} className="global-button">Ver hoja de personaje</Button>
            <Button variant="contained" sx={{mb: 4}} className="global-button">Expulsar</Button>
            <Button variant="contained" onClick={dejarReview} sx={{mb: 4}} key={userItemParticipant.ID} className="global-button">Ver Reviews</Button>
            
                </Grid>
            </Grid>
        </>
    )
}