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


export default function Profile(){
    const theme = useTheme();
    const [profilePic, setProfilePic] = useState("")
    const [profileName, setProfileName] = useState("")
    const [profileLastName, setProfileLastName] = useState("")
    const [profileEmail, setProfileEmail] = useState("")
    const [profilePassword, setProfilePassword] = useState("")

    const UserProfileReviewChange = (e) => setReview(e.target.value)

    const SubmitProfile = ()=> {
        console.log("editar perfil" + profileData)
        const ProfileData = { profileData, profileData} //Lo que voy amandar al servidor
        createReview(ReviewData)
    }
    return(
      <>
        <Container>

        <Card component="main" maxWidth="xs" sx={{ p: 4, backgroundColor: theme.palette.cardBg.main}}>     
       
       
           <Avatar sx={{ borderRadius: '50%', width: '200px', height: '200px' }} alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/60.jpg" />
          
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
           id="outlined-required"
           label="First Name"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ setProfileName }
           />
           <TextField 
           required
           id="outlined-required"
           label="Last Name"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ setProfileLastName }
           />

           

           <TextField 
           required
           id="outlined-required"
           label="Email"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           onChange={ setProfileEmail }
           />
           <TextField
           id="outlined-password-input"
           label="Password"
           type="password"
           autoComplete="current-password"
           onChange={ setProfilePassword }
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