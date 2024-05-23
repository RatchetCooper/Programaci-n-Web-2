"use client"
import { Box, Button, Card, Stack, CardMedia, Avatar, Grid, Typography, TextField, AvatarGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import UserCampaignsItemParticipants from "./UserCampaignsItemParticipants";
import { useRouter } from 'next/navigation'


export default function UserCampaignsCard({ userCampaignData }) {
    const theme = useTheme();
    const router = useRouter();

    const userItemParticipant = [{ "username": "Erika", "campaignName": "Test 1", "ID": "1" }, { "username": "Juan", "campaignName": "Test 2", "ID": "2" }]

    const editCampaign = () => {
        console.log("Editando campaña")
        router.push('/CreateCampaigns', { scroll: false }); // Cambia la URL a '/Reviews'

    };
    return (

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
            flexDirection: "column"
        }}>

            <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main, width: '100vh' }}>
                <Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>

                            <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }} >
                                <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                                    image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                                    title="Card img">
                                </CardMedia>
                                <Typography color={theme.palette.cardText.main} variant="body" > Nombre </Typography>
                            </Stack>

                            <CardMedia sx={{ width: '365px', height: '212px' }}
                                image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                                title="Card img">
                            </CardMedia>
                            <Typography color="textSecondary" variant="h4" sx={{ pt: 4, mb: 2 }} className="global-font"> Nombre de campaña </Typography>
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

                            <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", }} >
                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/60.jpg" />
                                    <Avatar alt="Travis Howard" src="https://randomuser.me/api/portraits/men/62.jpg" />
                                    <Avatar alt="Cindy Baker" src="https://randomuser.me/api/portraits/men/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                                <Typography color={theme.palette.cardText.main} variant="body">Jugadores en esta campaña</Typography>
                                <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
                            </Stack>


                        </Grid>


                        <Grid item xs={6} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, p: 2 }} >
                                <Button variant="contained" onClick={editCampaign} className="global-button">Editar campaña</Button>
                                <Button variant="contained" className="global-button">Borrar campaña</Button>
                            </Box>
                            <Typography color={theme.palette.cardText.main} variant="h4" sx={{ m: 2 }} className="global-font">Datos de la campaña</Typography>
                            <TextField
                                id="outlined-read-only-input"
                                label="Link Discord"
                                defaultValue="Colocar link"
                                InputProps={{
                                    readOnly: true,
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Fecha"
                                defaultValue="Hello World"
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Hora"
                                defaultValue="Hello World"
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Estrellas necesarias"
                                defaultValue="Hello World"
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Tipo de historia"
                                defaultValue="Hello World"
                                
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                id="outlined-read-only-input"
                                label="Descripción"
                                defaultValue="Hello World"
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    width: "100%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>


                </Stack>
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
        </Box>

    )
}