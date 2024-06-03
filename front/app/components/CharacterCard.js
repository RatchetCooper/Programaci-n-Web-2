import { Button, Box, Typography, Grid, Card } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import CookieManager from "../Cookies/Cookies";

export default function CharacterCard({ ficha }) {
    const theme = useTheme();

    const handleEditClick = () => {
        // Set the FichaId cookie with the value of ficha.id
        CookieManager.setCookie("FichaId", ficha.idFicha, 365);
        CookieManager.setCookie("IsOwner", true, 365);
        // Redirect to /Fichas
        window.location.href = '/Fichas';
    };

    return (
        <div>
            <Typography variant="h4">Tus personajes</Typography>

            {ficha ? (
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
                                <Typography color="white" variant="h4">Información</Typography>
                                <ul>
                                    <li><Typography color="white" variant="body">Nombre: {ficha.Nombre}</Typography></li>
                                    <li><Typography color="white" variant="body">Raza: {ficha.Raza}</Typography></li>
                                    <li><Typography color="white" variant="body">Clase: {ficha.Clase}</Typography></li>
                                    <li><Typography color="white" variant="body">Trasfondo: {ficha.Trasfondo}</Typography></li>
                                </ul>
                                <Button variant="contained" sx={{ mb: 4 }} onClick={handleEditClick}>
                                    Editar personaje
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                {ficha.Imagen && ficha.Tipo ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                                        <img 
                                          src={`data:${ficha.Tipo};base64,${Buffer.from(ficha.Imagen).toString('base64')}`} 
                                          alt="Character" 
                                          style={{ 
                                            width: '100%', 
                                            height: 'auto', 
                                            maxWidth: '300px', 
                                            maxHeight: '300px', 
                                            minWidth: '300px', 
                                            minHeight: '300px', 
                                            borderRadius: '10px', 
                                            boxShadow: '0px 13px 20px rgba(0, 0, 0, 0.6)', 
                                            border: '4px solid #ccc' 
                                          }} 
                                        />
                                    </div>
                                ) : (
                                    <Typography variant="body"color="red" >No hay imagen disponible</Typography>
                                )}
                            </Grid>
                        </Grid>

                    </Box>
                </Card>
            ) : (
                <Typography variant="h6">No hay fichas registradas</Typography>
            )}
        </div>
    );
}
