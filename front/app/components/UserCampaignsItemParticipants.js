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


    const ExplusarMiembro = async (IdExp,IdC) => {
        console.log('explusar miembro con id de:', IdExp);
        console.log('exp ademas de :', IdC);
        try {
            const response = await fetch('http://localhost:8000/ExplusarMiembro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IdExp: IdExp,IdC:IdC })
            });
            const data = await response.json();
            if (response.ok) {
                alert('miembro explusado');
                window.location.href = '/UserCampaigns';
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al explusar:', error.message);
        }
    };


    return(
        <>
        
        <Grid container spacing={2} >
       
                <Grid item xs={6} md={12}>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image={userItemParticipant.Imagen}
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">{userItemParticipant.Nombre}</Typography>
                        
                    </Stack>
                
                </Grid>
               
                <Grid item xs={6}>
                <Button variant="contained" sx={{mb: 4}}>Ver hoja de personaje</Button>
            <Button variant="contained" sx={{mb: 4}} onClick={()=>ExplusarMiembro(userItemParticipant.idUser,userItemParticipant.Id_Campaña)}>Expulsar</Button>
            <Button variant="contained" onClick={dejarReview} sx={{mb: 4}} key={userItemParticipant.ID}>Dejar review</Button>
            
                </Grid>
            </Grid>
        </>
    )
}