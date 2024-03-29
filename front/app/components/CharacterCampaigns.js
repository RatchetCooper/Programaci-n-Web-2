
"use client"
import {Button, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import CharacterItemCampaigns from "./CharacterItemCampaigns";

export default function CharacterCampaigns({charactercampaignData}){
    
    const theme = useTheme();
    return(
        <Box sx={{ 
            p: 5,
            flexDirection: "column",
            backgroundColor: theme.palette.secondary.main
        }}>
            <Typography color="textSecondary" variant="h4">Campañas</Typography>
            {
                charactercampaignData.map((item,index) =>( 
                    <CharacterItemCampaigns item={item}></CharacterItemCampaigns>
                ))
            }
        </Box>
    )

}