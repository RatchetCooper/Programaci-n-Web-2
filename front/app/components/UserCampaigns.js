import { Box,Button, Typography } from "@mui/material";
import UserCampaignsCard from "./UserCampaignsCard";

export default function UserCampaigns(){
    const userCampaignsData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    return(
        <div>
            <Box sx={{ 
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             p: 5,
             flexDirection: "column",
             width: ""
            }}>
                <Button variant="contained" sx={{mb: 4}}>Crear campaña</Button>     
                <Typography variant="h4">Tus campañas</Typography>
                
            </Box>
            
            
            {
            userCampaignsData.map((usercampaign,index) =>( 
                <UserCampaignsCard userCampaignData={usercampaign}></UserCampaignsCard>
            ))
            }
        </div>
    );
}