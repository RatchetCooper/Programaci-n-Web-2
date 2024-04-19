"use client"
import { Card,Button, InputLabel,RadioGroup, Radio, FormControlLabel, Select,MenuItem, Grid,Box,TextField, Stack, Badge, Avatar, IconButton, VisuallyHiddenInput} from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers';
export default function CreateCampaigns(){
    return(
        <div>
            <h1>Crear campaña</h1>
            <Stack>
                        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <h1>Información</h1>
                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        />
                                        <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="discordLink"
                                        label="Link discord"
                                        name="discord"
                                        
                                        autoFocus
                                        />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="discordLink"
                                        label="Link discord"
                                        name="discord"
                                        
                                        autoFocus
                                        />
                                        <h4>Fecha</h4>
                                        <DatePicker />
                                        <h4>Horario</h4>
                                        <TimePicker label="Basic time picker" />
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                <h1>Jugadores</h1>
                                <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="discordLink"
                                        label="Numero de jugadores"
                                        name="discord"
                                        
                                        autoFocus
                                        />
                                        <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="discordLink"
                                        label="Nombre de la campaña"
                                        name="discord"
                                        
                                        autoFocus
                                        />
                                        <InputLabel id="demo-simple-select-label">Número de estrellas</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            
                                            label="Número de estrellas"
                                           
                                            >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>

                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel value="Usar modulo" control={<Radio />} label="Usar modulo" />
                                            <FormControlLabel value="Usar historia original" control={<Radio />} label="Usar historia original" />
                                        </RadioGroup>
                                </Grid>
                                <Grid item xs={4}>
                                <h1>Imagen de campaña</h1>
                                <input
                                accept="image/*"
                                
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                />
                                    <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span">
                                    Upload
                                    </Button>
</label> 
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                            <Grid container spacing={2}>
                        
                                <Grid item xs={6}>
                                    <h1>Descripción de la campaña</h1>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Multiline"
                                        multiline
                                        rows={4}
                                      
                                        //defaultValue="Default Value"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <h1>Vincula un personaje a esta campaña</h1>
                                <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            
                                            label="Age"
                                           
                                            >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        
                                </Grid>
                            </Grid>
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{  display: "flex",  alignItems: "center",}} >
                        <Button variant="contained" sx={{mb: 4}}>Crear</Button>
                        </Stack>
            </Stack>
        </div>
    )
}