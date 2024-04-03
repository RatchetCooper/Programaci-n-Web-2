"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { useState } from 'react';
import { Card,Button, Stack, StyledBadge, Badge, Avatar, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Profile(){
    const theme = useTheme();
  
    return(
      <>
        <Container>

        <Card component="main" maxWidth="xs" sx={{ p: 4, backgroundColor: theme.palette.cardBg.main}}>     
       
       <Badge 
           overlap="circular"
           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
           badgeContent={
               <EditIcon sx={{ borderRadius: '50%', backgroundColor: theme.palette.secondary.main}}/>
               
           }
       >
           <Avatar sx={{ borderRadius: '50%', width: '200px', height: '200px' }} alt="Remy Sharp" src="https://randomuser.me/api/portraits/men/60.jpg" />
       </Badge>
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
           
           />
           <TextField 
           required
           id="outlined-required"
           label="Last Name"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           
           />

           

           <TextField 
           required
           id="outlined-required"
           label="Email"
           defaultValue="Hello World"
           variant="filled"
           fullWidth
           
           />
           <TextField
           id="outlined-password-input"
           label="Password"
           type="password"
           autoComplete="current-password"
           />
           </Stack>    
           </div>
       </Box>
       <Button variant="contained" sx={{mb: 4}}>Guardar</Button>
       <Button variant="contained" sx={{mb: 4}}>Cancelar</Button>
      
   </Card>
        </Container>
       
      
        </>
    )
}