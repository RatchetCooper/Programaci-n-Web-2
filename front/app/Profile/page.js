"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { useState } from 'react';
import { Card,Button, Stack, StyledBadge, Badge, Avatar, IconButton, VisuallyHiddenInput} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {editProfile} from '../services/editProfile'

export default function Profile(){
    const theme = useTheme();
    const [image, setImage] = useState(null);
    const [profilePic, setProfilePic] = useState("")
    const [profileName, setProfileName] = useState("")
    const [profileLastName, setProfileLastName] = useState("")
    const [profileEmail, setProfileEmail] = useState("")
    const [profilePassword, setProfilePassword] = useState("")
    const [avatarVisible, setAvatarVisible] = useState(false);

    const UserProfileNameChange = (e) => setProfileName(e.target.value)
    const UserProfileLastNameChange = (e) => setProfileLastName(e.target.value)
    const UserProfileEmailChange = (e) => setProfileEmail(e.target.value)
    const UserProfilePassChange = (e) => setProfilePassword(e.target.value)
    
    const imageChange = (e) => {
        setImage(e.target.files[0]);
        setAvatarVisible(true); // Mostrar el avatar CambiarImg cuando se carga una imagen
    };
    const SubmitProfile = ()=> {
        
        const ProfileData = { profileName, profileLastName, profileEmail, profilePassword } //Lo que voy amandar al servidor
        console.log("editar perfil" + JSON.stringify(ProfileData) + "  "+ profileName);
        editProfile(ProfileData)
        console.log(ProfileData)
    }
    return(
      <>
        <Container>

        <Card component="main" maxWidth="xs" sx={{ p: 4, backgroundColor: theme.palette.cardBg.main, m:4}}>     
       
       
           <Avatar sx={{ borderRadius: '50%', width: '200px', height: '200px' }} alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/60.jpg" />
           <input
                                accept="image/*"
                                
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={imageChange}
                                />
                                    <label htmlFor="raised-button-file">
                                    <Button variant="raised" component="span">
                                    Upload
                                    </Button>
                            </label> 
                                                
                    {avatarVisible && ( // Renderizar el avatar CambiarImg solo si avatarVisible es verdadero
                        <Avatar
                            id='CambiarImg'
                            sx={{ width: '200px', height: '200px' }}
                            alt="Imagen de campaña"
                            src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/200"} // Mostrar la imagen seleccionada si está presente, de lo contrario, mostrar una imagen de marcador de posición
                        />
                    )}
     <Box
       component="form"
       
       sx={{
             width: '20%',
             maxWidth: "xs"
          // '& .MuiTextField-root': { m: 1 },
       }}
       noValidate
       autoComplete="off"
       >
           <div>
           <Stack>
           <TextField 
           required
           id="outlined-required-pnc"
           label="First Name"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ UserProfileNameChange }
           
           />
           <TextField 
           required
           id="outlined-required-lnc"
           label="Last Name"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ UserProfileLastNameChange }
           />

           

           <TextField 
           required
           id="outlined-required-em"
           label="Email"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ UserProfileEmailChange }
           />
           <TextField
           id="outlined-password-input"
           label="Password"
           type="password"
           autoComplete="current-password"
           onChange={ UserProfilePassChange }
           />
           </Stack>    
           </div>
       </Box>
       <Button variant="contained" onClick={ SubmitProfile } sx={{mb: 4}}>Guardar</Button>
       <Button variant="contained" sx={{mb: 4}}>Cancelar</Button>
      
   </Card>
        </Container>
       
      
        </>
    )
}