"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import axios from 'axios';
import { Card,Button, Stack, StyledBadge, Badge, Avatar, IconButton, VisuallyHiddenInput} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {editProfile} from '../services/editProfile'
import { useParams} from 'react-router-dom'; // Import the useLocation hook
import CookieManager from '../Cookies/Cookies';
import React, { useState, useEffect } from 'react';

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
    

    const urlId = CookieManager.getCookie('IdP'); 
    const cookieId = CookieManager.getCookie('id');
    const [user, setUser] = useState(null);

   useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("cOOKIES"+urlId+""+cookieId)
                const response = await axios.post('http://localhost:8000/GetUser', { UserId: urlId });
                setUser(response.data.User);
               
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

       
            fetchData();
      
    }, [urlId, cookieId]);

    const imageChange = (e) => {
        setImage(e.target.files[0]);
        setAvatarVisible(true); // Mostrar el avatar CambiarImg cuando se carga una imagen
    };

    const SubmitProfile = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        const formData = new FormData();
        formData.append('username', profileEmail);
        formData.append('fullName', profileName);
        formData.append('password',profilePassword);
        formData.append('Id',cookieId);
        console.log(image);
        if (image) {
          formData.append('image', image);
        }
    
        try {
            const response = await fetch('http://localhost:8000/updateUser', {
              method: 'POST',
              body: formData
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
              // Redirect to the landing page on successful registration
              // Redirect using window.location
            } else {
              // Handle error messages
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error registering:', error.message);
          }
        };
    
      

    if (urlId !== cookieId) {
        return <Typography variant="h6">Unauthorized access</Typography>;
    }

    // If the ids match but user data is not yet fetched, display a loading message
    if (!user) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return(
      <>
        <Container>

        <Card component="main" maxWidth="xs" sx={{ p: 4, backgroundColor: theme.palette.cardBg.main, m:4}}>     
       
       
           <Avatar sx={{ borderRadius: '50%', width: '200px', height: '200px' }} alt="Remy Sharp" src={ `data:${user.ImageData};base64,${Buffer.from(user.Imagen).toString('base64')}`} />
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
                    <div>
                        <label color='#0000f'>
                                    Nueva Imagen
                            </label> 
                        <Avatar
                            id='CambiarImg'
                            sx={{ width: '200px', height: '200px' }}
                            alt="Imagen de campaña"
                            src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/200"} // Mostrar la imagen seleccionada si está presente, de lo contrario, mostrar una imagen de marcador de posición
                        /></div>
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
           defaultValue={user.Nombre}
           variant="filled"
           fullWidth
           onChange={ UserProfileNameChange }
           
           />
          
           

           <TextField 
           required
           id="outlined-required-em"
           label="Email"
           defaultValue={user.Email}
           variant="filled"
           
           fullWidth
           onChange={ UserProfileEmailChange }
           />
           <TextField
           id="outlined-password-input"
           label="Password"
           type="password"
        
           defaultValue={user.Nombre}
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