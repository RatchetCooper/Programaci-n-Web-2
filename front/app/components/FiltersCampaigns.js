"use client"
import {Button, Divider,Card, CardContent, CardMedia, Box, Typography, Grid, Item, Stack, FormControlLabel, RadioGroup, Radio, Select, MenuItem} from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import {createFilter} from '../services/reviewServices'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function FiltersCampaigns(){
    const theme = useTheme();
    const router = useRouter()
    const [filterName, setFilterName] = useState(null);
    const [filterTypeCampaign, setTypeCampaign] = useState(null);
    const [filterRating, setFilterRating] = useState('')
   
    const filterRatingChange = (e) => setFilterName(e.target.value)
    const filterTypeCampaignChange = (event) => setTypeCampaign(event.target.value)
    const filterNameChange = (e) => setFilterRating(e.target.value)
    
    const SubmitFilter = ()=> {
       
        const FilterData = {filterName, filterTypeCampaign, filterRating}
        createFilter(FilterData)
        console.log(FilterData)
        
    }
    return(
    <div>
         <Typography color="textSecondary" variant="h4">Filtros</Typography>
        
        <Box sx={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 5,
        m:5,
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main
        }}>
        
       
            <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main,  mt:4}}>
        
                <CardContent>
                <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                    <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                    <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                    Búsqueda por nombre de campaña
                    </Typography>
                </Stack>

                
               {/*  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography> */}
                <Divider color="textSecondary"></Divider>
                </CardContent>
                <TextField 
                onChange={filterNameChange}
                id="outlined-search" 
                label="Nombre de la campaña" 
                type="search" 
                helperText="Coloca el nombre de la campaña"
                />
                
                
        </Card>
        <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main,  mt:4}}>
            
                <CardContent>
                <Stack direction="row" spacing={2} sx={{  display: "flex", alignItems: "center", pt: 4, pb: 4}} >
                    <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                    <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                    Tipo de campañas
                    </Typography>
                </Stack>

                <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={filterTypeCampaignChange}
                                        >
                                            <FormControlLabel sx={{ color: theme.palette.inputBackground.main }} value="Todas" control={<Radio />} label="Todas las campañas" />
                                            <FormControlLabel  sx={{ color: theme.palette.inputBackground.main }} value="Recientes" control={<Radio />} label="Recientes" />
                                        </RadioGroup>
                {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography> */}

                <Divider color="textSecondary"></Divider>
                </CardContent>
                <TextField 
                id="outlined-search" 
                label="Search field" 
                type="search" 
                helperText="Some important text"
                />
                
                
            </Card>
            
            <Card sx={{ maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main, mt:4}}>
            
                <CardContent>
                <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center", pt: 4, pb: 4}} >
                    <TravelExploreRoundedIcon></TravelExploreRoundedIcon>
                    <Typography color={theme.palette.cardText.main}  gutterBottom variant="h5" component="div">
                    Búsqueda por rating
                    </Typography>
                </Stack>
                <Select 
                    onChange={filterRatingChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-character"
                    label="Age"
                    fullWidth
                    sx={{
                        bgcolor: theme.palette.inputBackground.main, // Cambia el color de fondo del Select
                        '&:focus': {
                          bgcolor: 'lightblue', // Cambia el color de fondo cuando está enfocado
                        },
                      }}
                                           
                                            >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
            
                <Divider color="textSecondary"></Divider>
                </CardContent>
                <TextField 
                id="outlined-search" 
                label="Search field" 
                type="search" 
                helperText="Some important text"
                />
                
                
            </Card>
            
            <Box sx={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
            flexDirection: "column",
            backgroundColor: theme.palette.secondary.main
            }}>
            
            
            
            <Button variant="contained" sx={{mb: 4}} onClick={ SubmitFilter }>Buscar</Button>
            </Box>
        </Box>

        
        
      
    </div>
)
}