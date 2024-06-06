"use client"
import { Box, Button, Card, Stack, CardMedia, Avatar, Grid, Typography, TextField, AvatarGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // Esta va ligada al provider
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import UserCampaignsItemParticipants from "./UserCampaignsItemParticipants";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function UserCampaignsCard({ camp }) {
    const theme = useTheme();
    const router = useRouter();

    const [Miembros, setMiembros] = useState([]);

    const editCampaign = () => {
        console.log("Editando campaña");
        router.push('/EditCampaigns', { scroll: false });
    };

    const BuscarMiembros = async (IdCampaña) => {
        console.log('Dentro de usercampaing id:', IdCampaña);
        try {
            const response = await fetch('http://localhost:8000/BuscarMiembros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ IdCampaña: IdCampaña })
            });
            const data = await response.json();
            if (response.ok) {
                for(const key in data){
           
                    var base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`; //campaña
            
                    data[key].Imagen = base64Image;}
                setMiembros(data);
                console.log('toda info de cariable miembros:',data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error al unirse:', error.message);
        }
    };

    useEffect(() => {
        if (camp && camp.IdCampaña) {
            BuscarMiembros(camp.IdCampaña);
        }
    }, [camp]);

    if (!camp) {
        return null;
    }

    return (
        <>
            <Card sx={{ p: 4, m: 5, backgroundColor: theme.palette.cardBg.main }}>
                <Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                                {camp.ImagenUsuario && (
                                    <CardMedia
                                        sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                                        image={camp.ImagenUsuario}
                                        title="Card img"
                                    />
                                )}
                                <Typography color={theme.palette.cardText.main} variant="body"> {camp.Nombre} </Typography>
                            </Stack>

                            {camp.Imagen && (
                                <CardMedia
                                    sx={{ width: '365px', height: '212px' }}
                                    image={camp.Imagen}
                                    title="Card img"
                                />
                            )}

                            <Typography color="textSecondary" variant="h4" sx={{ pt: 4 }}> {camp.Titulo} </Typography>

                            <Stack direction="row">
                                {/* Add buttons or other elements here */}
                            </Stack>
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
                            <Box sx={{ pb: 3 }}>
                                <Typography color={theme.palette.cardText.main} variant="body" sx={{ pt: 4, pb: 4 }}>Participantes</Typography>
                            </Box>
                            {Miembros.length > 0 ? (
                                Miembros.map((miembro, index) => (
                                    <UserCampaignsItemParticipants key={miembro.idUser} userItemParticipant={miembro} />
                                ))
                            ) : (
                                <Typography color="textSecondary" variant="body">No hay participantes</Typography>
                            )}
                        </Card>
                    </Stack>
                </Card>
            </Card>
        </>
    );
}