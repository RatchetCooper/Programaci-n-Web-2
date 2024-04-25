"use client"
import { Box,Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

import UserCampaignsCard from "../components/UserCampaignsCard";
export default function UserCampaigns(){
    const router = useRouter()
    const userCampaignsData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    const cambiarPagina = () => {
        //base de datos
        router.push('/CreateCampaigns', { scroll: false })
        
      };
    return(
        <div>
            <Button variant="contained" sx={{mb: 4}} onClick={cambiarPagina}>Crear campaña</Button>     
            <Typography variant="h4">Tus campañas</Typography>
            {
            userCampaignsData.map((usercampaign,index) =>( 
                <UserCampaignsCard userCampaignData={usercampaign}></UserCampaignsCard>
            ))
            }
        </div>
    );
}