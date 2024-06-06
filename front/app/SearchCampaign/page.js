"use client"
import {Button,Card, CardContent, Box, Typography, Grid, Item, Stack, CardMedia } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import FiltersCampaigns from "../components/FiltersCampaigns";
import SearchCampaignsCard from "../components/SearchCampaignsCard";
import { useRouter } from 'next/navigation'
import {useState} from "react";

export default function SearchCampaign(){
    const router = useRouter()
    const searchCampaignData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    const theme = useTheme();
    const [filteredData, setFilteredData] = useState([]);

    const cambiarPagina = () => {
        //base de datos
        router.push('/CreateCampaigns', { scroll: false })
        
      };

      const handleFilterSubmit = (data) => {
        setFilteredData(data);
        for(const key in data){
           
        var base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`; //campaña

        data[key].Imagen = base64Image;
        
        base64Image = `data:${data[key].ImagenUsuario};base64,${Buffer.from(data[key].ImagenUsuario).toString('base64')}`; //usuario
        data[key].ImagenUsuario = base64Image;

        

            var fecha = new Date(data[key].Fecha);
            fecha = fecha.getFullYear()+'-' + (fecha.getMonth()+1)+'-' + fecha.getDate();
            data[key].Fecha = fecha;
        }
    }

    return(
    <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <FiltersCampaigns onFilterSubmit={handleFilterSubmit} ></FiltersCampaigns>
        </Grid>
        <Grid item xs={12} md={8}>
                <Box sx={{ 
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "left",
                p: 5,
                m:5,
                flexDirection: "column",
               
                }}>
                <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mb: 4
                    }}>
                        
                        <Button variant="contained" sx={{ mb: 4 }} onClick={cambiarPagina}>Crear campañas</Button>
                
                    </Box>
                    
                    <Typography color={theme.palette.secondary.main} variant="h4">Buscar campañas</Typography>

            </Box>
                {filteredData.length > 0 && filteredData.map((campaign, index) => (
                    <SearchCampaignsCard key={index} campaign={campaign} />
                ))}
            </Grid>
    </Grid>
    )
}