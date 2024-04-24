"use client"
import { Box, Typography, Button, Stack } from "@mui/material";
import LandingCampaigns from "../components/LandingCampaigns";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import imagen from '../img/LandingImgs/portadatono.png'
export default function Landing(){
    const data = [{"username": "Erika",  "campaignName": "Nombre de la campaña 1"}, {"username": "Juan", "campaignName": "Nombre de la campaña 2"}]

    return(
        <div>
            <Box sx={{ 
                width: "100vw",
                height: "60vh",
                backgroundImage: 'url("./LandingImgs/portadatono.png")',
                backgroundSize: 'cover',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{ p:3, width: "50vw", backgroundColor:"rgba(0, 0, 0, 0.2)"}} >
                    <Typography variant="h4" sx={{
                        textAlign: "center",
                        color: "white"
                    }}>Somos una herramienta web gratuita que te vincula a las mejores campanas de calabozos y dragones</Typography>
                    <Typography variant="body1" sx={{
                        mt: 4,
                        textAlign: "center",
                        color: "white"
                    }}>Busca campañas por todo el mundo y unete a las mejores aventuras</Typography>
                </Box>
            </Box>
            <LandingCampaigns campaignData={ data } ></LandingCampaigns>

            <Stack sx={{  display: "flex",  alignItems: "center",}} >
            <h1>Crea tus personajes</h1> 
                    <Typography variant="body1" sx={{
                        textAlign: "center",
                        
                    }}>Comienza con la creación de personajes para unirte a las aventuras que tenemos para ti</Typography>
               
              
          
            <Button variant="contained" sx={{mt: 4}}>Crear personaje</Button>            
            </Stack>
                
        </div>
    );
}