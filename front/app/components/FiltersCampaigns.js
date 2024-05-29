"use client"
import {Button, Divider, Card, CardContent, Box, Typography, Stack, FormControlLabel, RadioGroup, Radio, Select, MenuItem} from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import TextField from '@mui/material/TextField';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import {createFilter} from '../services/reviewServices'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function FiltersCampaigns(){
    const theme = useTheme();
    const router = useRouter()
    const [filterName, setFilterName] = useState(null);
    const [filterTypeCampaign, setTypeCampaign] = useState(null);
    const [filterRating, setFilterRating] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
   
    const filterRatingChange = (e) => setFilterName(e.target.value)
    const filterTypeCampaignChange = (event) => setTypeCampaign(event.target.value)
    const filterNameChange = (e) => setFilterRating(e.target.value)
    
    const SubmitFilter = ()=> {
        const FilterData = {filterName, filterTypeCampaign, filterRating}
        createFilter(FilterData)
        console.log(FilterData)
    }

    
    const dateChange = (date) => {
        setSelectedDate(date)
        console.log(date)
    }

    const timeChange = (time) => {
        setSelectedTime(time)
        console.log(time)
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
            <Card sx={{ width: '100%', maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main, mt:4 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                        <TravelExploreRoundedIcon sx={{color:theme.palette.cardText.main}}/>
                        <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
                            Búsqueda por nombre de campaña
                        </Typography>
                    </Stack>
                    <Divider color="textSecondary" />
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
                    <TextField 
                        onChange={filterNameChange}
                        id="outlined-search" 
                        label="Nombre de la campaña" 
                        type="search" 
                        helperText="Coloca el nombre de la campaña"
                        fullWidth
                        sx={{ maxWidth: '100%' }}
                    />
                </Box>
            </Card>
    
            
            <Card sx={{ width: '100%', maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main, mt:4 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                        <StarBorderIcon  sx={{color:theme.palette.cardText.main}}/>
                        <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
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
                        <MenuItem value={1}>1 Estrella</MenuItem>
                        <MenuItem value={2}>2 Estrellas</MenuItem>
                        <MenuItem value={3}>3 Estrellas</MenuItem>
                        <MenuItem value={4}>4 Estrellas</MenuItem>
                        <MenuItem value={5}>5 Estrellas</MenuItem>
                    </Select>
                    <Divider color="textSecondary" />
                </CardContent>
                
            </Card>
            
            <Card sx={{ width: '100%', maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main, mt:4 }}>
                <CardContent>
                    <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                        <GroupsIcon sx={{color:theme.palette.cardText.main}} />
                        <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
                            Número máximo de jugadores
                        </Typography>
                    </Stack>
                    
                    <Divider color="textSecondary" />
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
                    <TextField 
                        id="outlined-search" 
                        label="Search field" 
                        type="search" 
                        helperText="Some important text"
                        fullWidth
                       
                        InputProps={{
                                    style: { color: 'white' },
                                }}
                               
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{  mb: 2,
                                    maxWidth: '100%',
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
                </Box>
            </Card>

            <Card sx={{ width: '100%', maxWidth: 345, backgroundColor: theme.palette.cardFilterColor.main, mt: 4 }}>
                    <CardContent>
                        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
                            <CalendarMonthIcon sx={{ color: theme.palette.cardText.main }} />
                            <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
                                Fecha y hora de inicio
                            </Typography>
                        </Stack>
                        <Divider color="textSecondary" />
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
                                Fecha
                            </Typography>
                            <DatePicker
                                value={selectedDate}
                                onChange={dateChange}
                                label="Fecha de inicio"
                                fullWidth
                                sx={{ width: '100%' }}
                            />
                            <Typography color={theme.palette.cardText.main} gutterBottom variant="h5" component="div">
                                Hora
                            </Typography>
                            <TimePicker
                                onChange={timeChange}
                                label="Hora de inicio"
                                fullWidth
                                sx={{ width: '100%' }}
                            />
                        </Stack>
                    </Box>
                </Card>

            <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 5,
                flexDirection: "column",
                backgroundColor: theme.palette.secondary.main
            }}>
                <Button variant="contained" sx={{ mb: 4 }} onClick={ SubmitFilter }>Buscar</Button>
            </Box>
        </Box>
    </div>
    )
}