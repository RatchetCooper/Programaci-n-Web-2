import { Box, Stack, Typography } from "@mui/material";
import CardCampana from "./CardCampana";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import theme from "../Theme.js";
import { createTheme } from '@mui/material/styles';

export default function LandingCampaigns({campaignData}){
    const theme = useTheme();
    return(
        <div>
            <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                flexDirection: "column"
            }}>
                
                <h1>Últimas campañas</h1>
                <Typography variant="body">Navega por las últimas campañas creadas por jugadores aventureros.</Typography>
                <br></br>
                
{/* 
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                {items.map((item, index) => (
                    <div key={index} style={{ marginRight: '10px' }}>
                    {item}
                    </div>
                ))}
                </div> */}
                 <Stack direction="row" spacing={2} sx={{ // Utiliza un Stack con dirección "row"
                    '@media (max-width:600px)': { // Media query para pantallas pequeñas
                        flexDirection: 'column', // Cambia la dirección a "column" para pantallas pequeñas
                        marginLeft: '-10px'
                    },
                    '@media (max-width: 1280px)': {
                        flexDirection: 'column', // Cambia a una columna cuando el ancho de la pantalla sea menor a 1280px
                        '& > *:not(:last-child)': {
                            marginBottom: '10px', // Añade margen inferior a todos los elementos excepto el último (en columnas)
                        },
                    },
                    
                }}>
                    {
                        campaignData.map((item, index) => (
                            <CardCampana key={index} item={item}></CardCampana>
                        ))
                    }
                </Stack>
               {/* 
               <div style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    campaignData.map((item,index) =>( 
                        <div key={index} style={{ marginRight: '10px' }}>
                        <CardCampana item={item}></CardCampana>
                        </div>
                    ))
                }
               </div> */}
                
            </Box>
        </div>
    );
}