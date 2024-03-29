import { Box, Typography } from "@mui/material";
import CardCampana from "./CardCampana";

export default function LandingCampaigns({campaignData}){
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