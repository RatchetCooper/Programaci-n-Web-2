import {Stack, Box, Button, CardMedia, Typography, Card, Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

export default function CharacterItemCampaigns({item}){
    const theme = useTheme();
    return(
        <Box >
            <Grid container spacing={2}>
       
                <Grid item xs={6}>
          
                    <Stack direction="row" spacing={2} >
                        <CardMedia sx={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        image="https://as2.ftcdn.net/v2/jpg/04/42/57/73/1000_F_442577398_uetMYujiwcmo5yaZmXCrmvs7YWH7OiC9.jpg"
                        title="Card img">
                        </CardMedia>
                        <Stack spacing={2} sx={{  m:4 }} >
                            <Typography color={theme.palette.cardText.main} variant="body" > {item.username} </Typography>
                            <Typography color={theme.palette.cardText.main} variant="body" > {item.campaignName} </Typography>
                        </Stack>
                    </Stack>
            
                </Grid>
      
                <Grid item xs={6}>
                    <Button variant="contained" sx={{mb: 4}}>Salir</Button>
                </Grid>

            </Grid>
           
        </Box>

        
       
    )
}