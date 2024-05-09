"use client"
import {Button, Box, Typography, Grid, Item, Stack, CardMedia, Card, Rating } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CharacterCampaigns from "./CharacterCampaigns";

export default function CharacterCard(){
    const data = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
  
    const theme = useTheme();
    return(
        <div>
             <Button variant="contained" sx={{mb: 4}}>Crear personaje</Button>




             
                    <Typography variant="h4">Tus personajes</Typography>
                        

            <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main,  width: '100vh'}}>
           
                        <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                flexDirection: "column",
                backgroundColor: theme.palette.cardBg.main
            }}>
            
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <Rating
                            
                            value= {2}
                            /* Available Props */
                        />
                        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                        
                            <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                            title="Card img">
                            </CardMedia>
                            <Typography color={theme.palette.cardText.main} variant="body">Texto pequeño</Typography>
                            
                        </Stack>
                        <Typography color={theme.palette.cardText.main} variant="h4">Información</Typography>
                       
                        <Stack spacing={2} sx={{  display: "flex"}} >
                           
                        <Typography variant="body">Nombre de personaje</Typography>
                        <Typography variant="body">Edad</Typography>
                        </Stack>
                        
                        <Button variant="contained" sx={{mb: 4}}>Editar personaje</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ 
                            
                            height: "60vh",
                            backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg)',
                            backgroundSize: 'cover',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        </Box>
                    </Grid>
        
                </Grid>

                <CharacterCampaigns charactercampaignData={ data }></CharacterCampaigns>
            </Box>
        </Card>
             
        </div>
    );
}