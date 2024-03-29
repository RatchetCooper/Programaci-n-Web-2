"use client"
import {Button, Divider,Card, CardContent, CardMedia, Box, Typography, Grid, Item, Stack} from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
export default function FiltersCampaigns(){
    const theme = useTheme();
    return(
    <div>
         <Typography color="textSecondary" variant="h4">Filtros</Typography>
        
        <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main
        }}>
        
       
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main}}>
        
            <CardContent>
            <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
            </Stack>

            
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            <Divider color="textSecondary"></Divider>
            </CardContent>
            <TextField 
            id="outlined-search" 
            label="Search field" 
            type="search" 
            helperText="Some important text"
            />
            
            
        </Card>
    
        </Box>

        <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main
        }}>
        
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main}}>
        
            <CardContent>
            <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
            </Stack>

            
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            <Divider color="textSecondary"></Divider>
            </CardContent>
            <TextField 
            id="outlined-search" 
            label="Search field" 
            type="search" 
            helperText="Some important text"
            />
            
            
        </Card>
        
        </Box>

        <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main
        }}>
         
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main}}>
        
            <CardContent>
            <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
            </Stack>

            
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            <Divider color="textSecondary"></Divider>
            </CardContent>
            <TextField 
            id="outlined-search" 
            label="Search field" 
            type="search" 
            helperText="Some important text"
            />
            
            
        </Card>
        
        <Button variant="contained" sx={{mb: 4}}>Buscar</Button>
        </Box>
      
    </div>
)
}