"use client"
import { Card, Button, InputLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Grid, Box, TextField, Stack, Badge, Avatar, IconButton, VisuallyHiddenInput } from "@mui/material";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { createCampaign } from '../services/reviewServices'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns';
import CookieManager from '../Cookies/Cookies';

const cookieId = CookieManager.getCookie('id');


export default function EditCampaigns() {
  const router = useRouter()
  const [nameCampaign, setNameCampaign] = useState("")
  const [linkDiscord, setLinkDiscord] = useState("")
  const [numJugadores, setNumJugadores] = useState("")
  const [numEstrellas, setNumEstrellas] = useState("")
  const [desCampaign, setDesCampaign] = useState("")
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState('')

  const nameCampaignChange = (e) => setNameCampaign(e.target.value)
  const nameDiscordChange = (e) => setLinkDiscord(e.target.value)
  const numJugadoresChange = (e) => setNumJugadores(e.target.value)
  const numEstrellasChange = (e) => setNumEstrellas(e.target.value)
  const desCampaignChange = (e) => setDesCampaign(e.target.value)
  const imageChange = (e) => setImage(e.target.files[0])
  const SelectCharacterChange = (e) => setSelectedCharacter(e.target.value)
  const handleRadioChange = (event) => setSelectedHistory(event.target.value)



  const [imageURL, setImageURL] = useState('');
  var Fecha1 = new Date();
  var Fecha2 = new Date();
  var Hora = new Date();

  const dateChange = (date) => {

    setSelectedDate(date)
    console.log(date)
    Fecha1 = date.toDate()
    Fecha2 = Fecha1.getFullYear() + '-' + (Fecha1.getMonth() + 1) + '-' + Fecha1.getDate()

    console.log(Fecha2)

  }

  const timeChange = (time) => {


    Fecha1 = time.toDate()
    Hora = Fecha1.getHours() + ':' + Fecha1.getMinutes() + ':' + Fecha1.getSeconds()
    setSelectedTime(Hora)
    console.log(Hora)
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };
  const SubmitCampaign = async () => {
    const formData = new FormData();
    /*
    nameCampaign: nameCampaign, 
    nameCampaign: desCampaign, 
    numJugadores: numJugadores,
    currentPlayer: setSelectedCharacter, numEstrellas: numEstrellas,
                linkDiscord: linkDiscord, selectedTime: selectedTime, selectedDate: Fecha2, imagen: image
    */
    formData.append('nameCampaign', nameCampaign);
    formData.append('desCampaign', desCampaign);
    formData.append('numJugadores', numJugadores);
    formData.append('currentPlayer', setSelectedCharacter);
    formData.append('numEstrellas', numEstrellas);
    formData.append('linkDiscord', linkDiscord);
    formData.append('selectedTime', selectedTime);
    formData.append('IdHost', cookieId);
    var fecha3 = new Date();
    fecha3 = Fecha2.getFullYear() + '-' + (Fecha2.getMonth() + 1) + '-' + Fecha2.getDate();
    console.log('informacion de la fechas a mandar:', fecha3);
    formData.append('Fecha2', fecha3);
    console.log(selectedTime);
    console.log(image);
    if (image) {
      formData.append('image', image);
    }
    try {
      /*var y = btoa(image);
      console.log(atob(y));
      var x = atob(y);*/
      const response = await fetch('http://localhost:8000/createcampaigns', {
        method: 'POST',
        body: formData

      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Redirect to the landing page on successful login
        window.location.href = '/Landing'; // Redirect using window.location
      } else {
        // Handle error messages
        console.error(data.message);
      }
    }
    catch (error) {
      console.error('Error crear campaña: ', error.message);
    }
  };




  return (
    <div>
      <h1>Editar campaña</h1>
      <Stack>
        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", }} >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <h1>Información</h1>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                {/*  <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="titulocampaign"
                                        label="Nombre de la campaña"
                                        name="nameCampaign"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={ nameCampaignChange }
                                        
                                        /> */}
                <TextField

                  margin="normal"
                  required
                  fullWidth
                  id="titulocampaign"
                  label="Nombre de la campaña"
                  name="nameCampaign"
                  onChange={nameCampaignChange}
                  InputProps={{
                    style: { color: 'black' }
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                    shrink: true,  // Asegura que el label se comporte correctamente
                  }}
             
                  sx={{ mb: 2 }}
                />
                {/*  <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="linkDiscord"
                                        label="Link discord"
                                        name="discord"
                                        onChange={ nameDiscordChange }
                                        autoFocus
                                        /> */}
                <TextField

                  margin="normal"
                  required
                  fullWidth
                  id="linkDiscord"
                  label="Link discord"
                  name="discord"
                  onChange={nameDiscordChange}
                  InputProps={{
                    style: { color: 'black' }
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                    shrink: true,  // Asegura que el label se comporte correctamente
                  }}
                  sx={{ mb: 2 }}
                />
                <h4>Fecha</h4>
                <DatePicker
                  value={selectedDate}
                  onChange={dateChange}

                >
                </DatePicker>
                <h4>Horario</h4>
                <TimePicker
                  onChange={timeChange}
                  label="Basic time picker" />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <h1>Jugadores</h1>
              {/*    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="discordLink"
                                        label="Numero de jugadores"
                                        name="discord"
                                        onChange={numJugadoresChange}
                                        autoFocus
                                        /> */}
              <TextField

                margin="normal"
                required
                fullWidth
                id="discordLink"
                label="Número de jugadores"
                name="numjuadores"
                onChange={numJugadoresChange}
                InputProps={{
                  style: { color: 'black' }
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                  shrink: true,  // Asegura que el label se comporte correctamente
                }}

                sx={{ mb: 2 }}
              />
              {/*   <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="MinNumEstrellas"
                                        label="Mínimo de estrellas"
                                        name="estrellas"
                                        onChange={ numEstrellasChange}
                                        autoFocus
                                        /> */}

              <TextField

                margin="normal"
                required
                fullWidth
                id="MinNumEstrellas"
                label="Mínimo de estrellas"
                name="estrellas"
                onChange={numEstrellasChange}
                InputProps={{
                  style: { color: 'black' }
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                  shrink: true,  // Asegura que el label se comporte correctamente
                }}

                sx={{ mb: 2 }}
              />
              {/*   <InputLabel id="demo-simple-select-label">Número de estrellas</InputLabel>
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
                                        </Select> */}

              {/* <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                            onChange={handleRadioChange}
                                        >
                                            <FormControlLabel value="Usar modulo" control={<Radio />} label="Usar modulo" />
                                            <FormControlLabel value="Usar historia original" control={<Radio />} label="Usar historia original" />
                                        </RadioGroup> */}
            </Grid>
            <Grid
              item
              xs={12} md={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:  'flex-start',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <h1>Imagen de campaña</h1>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <Avatar
                sx={{ width: '200px', height: '200px', mt: 2 }}
                alt="Imagen de campaña"
                src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/200"}
              />
            </Grid>

          </Grid>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", }} >
          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <h1>Descripción de la campaña</h1>
              <TextField
                id="outlined-multiline-static-desc"
                label=""
                multiline
                rows={4}
                onChange={desCampaignChange}
                //defaultValue="Default Value"
                fullWidth

                sx={{
                  mb: 2,
                  maxWidth: '100%'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1>Vincula un personaje a esta campaña</h1>
              <Select onChange={SelectCharacterChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select-character"

                label="Age"
                fullWidth
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

            </Grid>
          </Grid>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", }} >
          <Button variant="contained" sx={{ mb: 4 }} onClick={SubmitCampaign}>Crear campaña</Button>
        </Stack>
      </Stack>
    </div>
  )
}