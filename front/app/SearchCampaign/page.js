"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";
import { Typography, Container, Box, Card, CardContent, Stack, CardActions, Button} from "@mui/material";
import FiltersCampaigns from "../components/FiltersCampaigns";
import { useTheme } from '@mui/material/styles';

export default function SearchCampaign() {
    const router = useRouter();
    const [filteredData, setFilteredData] = useState([]);
    const theme = useTheme();

    

    const handleFilterSubmit = (data) => {
        setFilteredData(data);
        for(const key in data){
           
            const base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`;
          
            data[key].Imagen = base64Image;

            var fecha = new Date(data[key].Fecha);
            fecha = fecha.getFullYear()+'-' + (fecha.getMonth()+1)+'-' + fecha.getDate();
            data[key].Fecha = fecha;
        }
    }

    return (
        <Container sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
            m: 5,
            flexDirection: "column"
        }}>
            <FiltersCampaigns onFilterSubmit={handleFilterSubmit} />
            {filteredData.length > 0 && filteredData.map((campaign, index) => (
                 
                <Card key={index} sx={{ width: '100%', maxWidth: 345, mt: 4, backgroundColor: theme.palette.cardFilterColor.main }}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{ color: theme.palette.cardText.main }}>
                            {campaign.Titulo}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="textSecondary">
                            {campaign.description}
                        </Typography>
                        
                        <Typography variant="body2">
                            Max Players: {campaign.MaxPlayers}
                        </Typography>
                        <Typography variant="body2">
                            Jugadores Actuales: {campaign.CurrentPlayers}
                        </Typography>
                        <Typography variant="body2">
                            Start Date: {campaign.Fecha}
                        </Typography>
                        <Typography variant="body2">
                            Start Time: {campaign.Horario}
                        </Typography>
                        <img src={campaign.Imagen} alt="Imagen" style={{ ancho: 40, alto: 40, borderRadius: '50%' }} />
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => router.push(`/campaign/${campaign.id}`)}>Learn More</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    );
}
