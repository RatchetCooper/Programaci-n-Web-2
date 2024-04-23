import { Box, Typography } from "@mui/material";
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
                <Typography variant="h4">validar</Typography>
                <Typography variant="body">Texto pequeño</Typography>
                {
                    campaignData.map((item,index) =>( 
                        <CardCampana item={item}></CardCampana>
                    ))
                }
                
            </Box>
        </div>
    );
}