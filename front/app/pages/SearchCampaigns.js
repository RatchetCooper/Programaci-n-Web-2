import { Button, Box, Typography, Grid, Item, Stack, CardMedia } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // Esta va ligada al provider
import { useState } from 'react';
import FiltersCampaigns from "../components/FiltersCampaigns";
import SearchCampaignsCard from "../components/SearchCampaignsCard";
import CampaignDetails from './CampaignDetails'; // Importar CampaignDetails

export default function CharacterCampaigns() {
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const searchCampaignData = [
        { "username": "Erika", "campaignName": "Test 1", "id": 1 },
        { "username": "Juan", "campaignName": "Test 2", "id": 2 }
    ];
    const theme = useTheme();

    const handleSelectCampaign = (campaign) => {
        setSelectedCampaign(campaign);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FiltersCampaigns />
            </Grid>
            <Grid item xs={8}>
                <Button variant="contained" sx={{ mb: 4 }}>Crear campañas</Button>
                <Typography color={theme.palette.secondary.main} variant="h4">Buscar campañas</Typography>
                
                {selectedCampaign ? (
                    <div>
                        <Button variant="contained" sx={{ mb: 4 }} onClick={() => setSelectedCampaign(null)}>Volver a la búsqueda</Button>
                        <CampaignDetails id={selectedCampaign.id} />
                    </div>
                ) : (
                    <div>
                        {searchCampaignData.map((searchCampaign, index) => (
                            <div key={index}>
                                <SearchCampaignsCard item={searchCampaign} />
                                <Button variant="contained" sx={{ mb: 4 }} onClick={() => handleSelectCampaign(searchCampaign)}>Ver Detalles</Button>
                            </div>
                        ))}
                    </div>
                )}
            </Grid>
        </Grid>
    );
}
