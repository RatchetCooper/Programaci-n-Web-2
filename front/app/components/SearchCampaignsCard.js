"use client"
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import FiltersCampaigns from "../components/FiltersCampaigns";
import { Box, Typography, Button, Stack, Card, Grid, CardMedia, Item, TextField } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export default function SearchCampaignsCard({item}){
    const theme = useTheme();

    return(
        <Card sx={{ p: 4, m:5, backgroundColor: theme.palette.cardBg.main}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                        </CardMedia>
                        <Typography color={theme.palette.cardText.main} variant="body" > {item.username} </Typography>
                    </Stack>

                    <CardMedia sx={{  width: '365px' ,height: '212px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                    </CardMedia>

                    <Typography color="textSecondary" variant="h4" sx={{pt: 4}}> { item.campaignName} </Typography>
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
                <h2>Palabra</h2>
                <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                 <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                 <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                 <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                 <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                 <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </Grid>
            </Grid>
        </Card>
    )
}