"use client"
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { Box, Typography, Button, Stack, Card, Grid, CardMedia, TextField, CardContent, CardActions } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useRouter } from 'next/navigation';

export default function SearchCampaignsCard({ campaign }) {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Card sx={{ p: 4, m: 5, backgroundColor: theme.palette.cardBg.main }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image={campaign.ImagenUsuario}
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body"> {campaign.Nombre} </Typography> 
                    </Stack>

                    <CardMedia sx={{ width: '365px', height: '212px' }}
                        image={campaign.Imagen}
                        title="Card img">
                    </CardMedia>

                    <Typography color="textSecondary" variant="h4" sx={{ pt: 4 }}> {campaign.Titulo} </Typography>
                    <Button variant="contained" sx={{ mb: 4 }} onClick={() => router.push(`/campaign/${campaign.id}`)}>Learn More</Button>
                    {/* <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image={campaign.Imagen}
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">Texto pequeño</Typography>
                        <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
                    </Stack> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        id="outlined-read-only-input"
                        label="Máximo de jugadores"
                        defaultValue={` ${campaign.MaxPlayers}`}
                        InputProps={{
                            readOnly: true, 
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    
                    
                    <TextField
                        id="outlined-read-only-input"
                        label="Jugadores actuales"
                        defaultValue={` ${campaign.CurrentPlayers}`}
                        InputProps={{
                            readOnly: true, 
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                  
                    <TextField
                        id="outlined-read-only-input"
                        label="Fecha de inicio"
                        defaultValue={` ${campaign.Fecha}`}
                        InputProps={{
                            readOnly: true, 
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                  

                    <TextField
                        id="outlined-read-only-input"
                        label="Horario de inicio"
                        defaultValue={` ${campaign.Horario}`}
                        InputProps={{
                            readOnly: true, 
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    {/* 
                    <TextField
                        id="outlined-read-only-input"
                        label="Título"
                        defaultValue={campaign.Titulo}
                        InputProps={{
                            readOnly: true,
                        }}
                    /> */}
                    <TextField
                        id="outlined-read-only-input"
                        label="Descripción"
                        defaultValue={campaign.Descripcion}
                        InputProps={{
                            readOnly: true,
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}