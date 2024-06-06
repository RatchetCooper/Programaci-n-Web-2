"use client"
import { Card, Stack, Typography, CardMedia, Button } from "@mui/material";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import theme from "../Theme.js";
import { createTheme } from '@mui/material/styles';

export default function CardCampana( {item}){
    const theme = useTheme();
    return(
        <Card sx={{ p: 4, backgroundColor: theme.palette.cardBg.main}}> 
            <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                
              
            </Stack>

            <CardMedia sx={{  width: '365px' ,height: '212px' }}
                image={item.Imagen}
                title="Card img">
            </CardMedia>

            <Typography color="textSecondary" variant="h4" sx={{pt: 4}}> { item.Titulo} </Typography>
            <Button variant="contained" sx={{mb: 4}}>Unirse</Button>
            <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                
                <PanoramaFishEyeIcon></PanoramaFishEyeIcon>
            </Stack>
            
        </Card>
    );   
}