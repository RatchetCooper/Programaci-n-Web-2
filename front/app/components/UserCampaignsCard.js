"use client"
import { Box, Button, Card, Stack, CardMedia, Avatar, Grid, Typography, TextField, AvatarGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import UserCampaignsItemParticipants from "./UserCampaignsItemParticipants";
import { useRouter } from 'next/navigation'


export default function UserCampaignsCard({ camp }) {
    const theme = useTheme();
    const router = useRouter();

    const userItemParticipant = [{ "username": "Erika", "campaignName": "Test 1", "ID": "1" }, { "username": "Juan", "campaignName": "Test 2", "ID": "2" }]

    const editCampaign = () => {
        console.log("Editando campaña")
        router.push('/CreateCampaigns', { scroll: false }); // Cambia la URL a '/Reviews'

    };
    return (
<>
        <Card sx={{ p: 4, m: 5, backgroundColor: theme.palette.cardBg.main }}>
            <Stack>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    
                    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image={camp.ImagenUsuario}
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body"> {camp.Nombre} </Typography> 
                    </Stack>

                    <CardMedia sx={{ width: '365px', height: '212px' }}
                        image={camp.Imagen}
                        title="Card img">
                    </CardMedia>

                    <Typography color="textSecondary" variant="h4" sx={{ pt: 4 }}> {camp.Titulo} </Typography>

                    <Stack direction="row">
                                <Button variant="contained" sx={{ mb: 4 }} className="global-button">Invitar</Button>
                                <TextField
                                    id="outlined-basic"
                                    //label="Outlined" 
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                            borderRadius: "30px",
                                            background: theme.palette.inputBackground.main
                                        }
                                    }}
                                />
                            </Stack>
                    {/* <Button variant="contained" sx={{ mb: 4 }} onClick={() => router.push(`/campaign/${campaign.id}`)}>Learn More</Button> */}
                    {/* <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                            image={camp.Imagen}
                            title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">Texto pequeño</Typography>
                        <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
                    </Stack> */}
                </Grid>
                <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, p: 2 }} >
                                <Button variant="contained" onClick={editCampaign} className="global-button">Editar campaña</Button>
                                <Button variant="contained" className="global-button">Borrar campaña</Button>
                            </Box>
                    <TextField
                        id="outlined-read-only-input"
                        label="Máximo de jugadores"
                        defaultValue={` ${camp.MaxPlayers}`}
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
                        defaultValue={` ${camp.CurrentPlayers}`}
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
                        defaultValue={` ${camp.Fecha}`}
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
                        defaultValue={` ${camp.Horario}`}
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
                        defaultValue={camp.Descripcion}
                        InputProps={{
                            readOnly: true,
                            style: { color: 'white' }
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                </Grid>
            </Grid>
            </Stack>
            
            <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main, width: '100vh' }}>
                
                <Stack>
                    <Card sx={{ p: 4, m: '0 auto', backgroundColor: theme.palette.cardFilterColor.main, width: "90%", maxWidth: 600 }} className="campaigns-card">

                        <Box sx={{
                            pb: 3
                        }}>

                            <Typography color={theme.palette.cardText.main} variant="body" sx={{ pt: 4, pb: 4 }}>Participantes</Typography>
                        </Box>


                        {
                            userItemParticipant.map((itemParticipant, index) => (
                                <UserCampaignsItemParticipants key={itemParticipant.ID} userItemParticipant={itemParticipant} ></UserCampaignsItemParticipants>

                            ))
                        }
                    </Card>
                </Stack>
            </Card>
        </Card>

       

   </> 
   )
}