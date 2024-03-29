"use client"
import { Box,Button, Card, Stack, CardMedia, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export default function UserCampaignsCard({userCampaignData}){
    const theme = useTheme();
    
    return(
        <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body" > {userCampaignData.username} </Typography>
                    </Stack>

                    <CardMedia sx={{  width: '365px' ,height: '212px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                    </CardMedia>

                    <Typography color="textSecondary" variant="h4" sx={{pt: 4}}> { userCampaignData.campaignName} </Typography>
                    <Button variant="contained" sx={{mb: 4}}>Unirse</Button>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body">Texto pequeño</Typography>
                        <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                <Button variant="contained" sx={{mb: 4}}>Editar campaña</Button>
                <Button variant="contained" sx={{mb: 4}}>Borrar campaña</Button>
                    
                <h2>Palabra</h2>
                </Grid>
            </Grid>
        </Card>
    )
}