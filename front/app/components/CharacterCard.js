import { Button, Box, Typography, Grid, Card } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // esta va ligada al provider
import CookieManager from "../Cookies/Cookies";

export default function CharacterCard({ ficha }) {
    const theme = useTheme();

    const handleEditClick = () => {
        // Set the FichaId cookie with the value of ficha.id
        if (ficha && ficha.id) {
            CookieManager.setCookie("FichaId", ficha.id, 365);
            // Redirect to /Fichas
            window.location.href = '/Fichas';
        } else {
            console.error("Ficha or ficha.id is undefined");
        }
    };

    return (
        <div>
            <Typography variant="h4">Tus personajes</Typography>

            <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main, width: '100vh' }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 5,
                    flexDirection: "column",
                    backgroundColor: theme.palette.cardBg.main
                }}>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography color={theme.palette.cardText.main} variant="h4">Información</Typography>
                            {/* Verificación de ficha y ficha.Nombre */}
                            <Typography variant="body">
                                {ficha && ficha.Nombre ? ficha.Nombre : 'Nombre no disponible'}
                            </Typography>
                            <Button variant="contained" sx={{ mb: 4 }} onClick={handleEditClick}>
                                Editar personaje
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{
                                height: "60vh",
                                backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg)',
                                backgroundSize: 'cover',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Card>
        </div>
    );
}
