"use client"

import { Box, Button, Card, Stack, CardMedia, Avatar, Grid, Typography, TextField, AvatarGroup } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useRouter } from 'next/navigation'


export default function UserReviewsCard() {
    const theme = useTheme();
    const router = useRouter();
    return (
        <div>

        {/*     
      <Box sx={{
        display: "flex",
        justifyContent: "center",

      }}>
        <Box sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 4
          }}>
            <Button variant="contained" className="global-button">
              Crear campaña
            </Button>
          </Box>
          <Typography className="global-text-header">card review</Typography>
        </Box>
      </Box> */}

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 5, flexDirection: "column" }}>
            <Card sx={{ p: 4, backgroundColor: theme.palette.background.paper, width: '100vh' }}>
                <Stack spacing={2}>
                    <Typography variant="h1" sx={{ color: '#272640', fontWeight: 700, letterSpacing: '-1.44px' }}>
                        Calificaciones
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6c7275', textAlign: 'center', fontWeight: 600 }}>
                        Nombre de la campaña
                    </Typography>
                    <Box sx={{ backgroundColor: '#fff', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ width: '100%' }}>
                            <Avatar sx={{ width: 276, height: 276 }} src="..." alt="User Avatar" />
                            <Typography variant="h4" sx={{ color: '#272640', fontWeight: 700 }}>
                                Nombre de usuario que hizo el review
                            </Typography>
                        </Stack>
                        
                        <Box sx={{ mt: 4, width: '100%', p: 2, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ color: '#272640', fontWeight: 700 }}>
                                Comentario
                            </Typography>
                            <Box sx={{ mt: 2, width: '100%', border: 1, borderColor: 'rgba(0, 0, 0, 0.87)', borderRadius: 1, p: 2 }}>
                                <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                    Label
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    defaultValue="Input text"
                                    InputProps={{ style: { color: 'rgba(0, 0, 0, 0.87)' } }}
                                    sx={{ mt: 1, mb: 2 }}
                                />
                            </Box>
                        </Box>
                        {/* <Stack direction="row" spacing={2} sx={{ mt: 2, width: '100%', justifyContent: 'center' }}>
                            <Button variant="contained" sx={{ background: 'linear-gradient(180deg, #5e5aae 0%, #36c5cd 100%)' }}>
                                Enviar
                            </Button>
                            <Button variant="contained" sx={{ background: 'linear-gradient(180deg, #5e5aae 0%, #36c5cd 100%)' }}>
                                Cancelar
                            </Button>
                        </Stack> */}
                    </Box>
                </Stack>
            </Card>
        </Box>
        </div>
    );
 }