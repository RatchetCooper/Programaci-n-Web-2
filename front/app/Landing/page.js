"use client"
import { Box, Typography } from "@mui/material";
import LandingCampaigns from "../components/LandingCampaigns";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { ThemeProvider } from '@mui/material/styles'; //Contexto
import theme from "../Theme";

export default function Landing(){
    const data = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
   
    return(
        <div>
            <ThemeProvider theme={ theme }>
         
        
            <Box sx={{ 
                width: "100vw",
                height: "60vh",
                backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg)',
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
            </ThemeProvider>
        </div>
    );
}