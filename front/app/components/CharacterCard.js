"use client"
import {Button, Box, Typography, Grid, Item, Stack, CardMedia } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CharacterCampaigns from "./CharacterCampaigns";

export default function CharacterCard(){
    const data = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
  
    const theme = useTheme();
    return(
        <div>
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
                        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                            <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                            title="Card img">
                            </CardMedia>
                            <Typography color={theme.palette.cardText.main} variant="body">Texto pequeño</Typography>
                            <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
                        </Stack>
                        <Typography color={theme.palette.cardText.main} variant="h4">Información</Typography>
                        <Stack></Stack> 
                        <Typography variant="body">Texto pequeño</Typography>
                        <Typography variant="body">Texto pequeño</Typography>
                        <Button variant="contained" sx={{mb: 4}}>Unirse</Button>
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
        </div>
    );
}