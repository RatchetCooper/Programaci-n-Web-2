"use client"
import { Box,Button, Card, Stack, CardMedia, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

export default function UserCampaignsItemParticipants({userItemParticipant} ){
    const theme = useTheme();
    return(
        <>
        
        <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">{userItemParticipant.username}</Typography>
                        
                    </Stack>
                
                </Grid>
                <Grid item xs={6}>
                <Button variant="contained" sx={{mb: 4}}>Ver hoja de personaje</Button>
            <Button variant="contained" sx={{mb: 4}}>Expulsar</Button>
            <Button variant="contained" sx={{mb: 4}}>Dejar review</Button>
            
                </Grid>
            </Grid>
        </>
    )
}