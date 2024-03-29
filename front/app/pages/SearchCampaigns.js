"use client"
import {Button, Box, Typography, Grid, Item, Stack, CardMedia } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import FiltersCampaigns from "../components/FiltersCampaigns";
import SearchCampaignsCard from "../components/SearchCampaignsCard";

export default function CharacterCampaigns(){
    const searchCampaignData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    const theme = useTheme();
    return(
    <Grid container spacing={2}>
        <Grid item xs={4}>
        <FiltersCampaigns></FiltersCampaigns>
        </Grid>
        <Grid item xs={8}>
        <Button variant="contained" sx={{mb: 4}}>Crear campañas</Button>
        <Typography color={theme.palette.secondary.main} variant="h4">Buscar campañas</Typography>
         {
            searchCampaignData.map((searchcampaign,index) =>( 
                <SearchCampaignsCard item={searchcampaign}></SearchCampaignsCard>
            ))
        }
        </Grid>
    </Grid>
    )
}