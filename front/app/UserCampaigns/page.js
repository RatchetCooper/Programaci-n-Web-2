import { Box,Button, Typography } from "@mui/material";

import UserCampaignsCard from "../components/UserCampaignsCard";
export default function UserCampaigns(){
    const userCampaignsData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    return(
        <div>
            <Button variant="contained" sx={{mb: 4}}>Crear campaña</Button>     
            <Typography variant="h4">Tus campañas</Typography>
            {
            userCampaignsData.map((usercampaign,index) =>( 
                <UserCampaignsCard userCampaignData={usercampaign}></UserCampaignsCard>
            ))
            }
        </div>
    );
}