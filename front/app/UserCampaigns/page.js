"use client"
import { Box,Button, Grid, Card, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'
import CookieManager from '../Cookies/Cookies.js';
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider

import React, { useState,useEffect } from "react";
var Id;
const GetUser = async () => {
    try {
      const userId = CookieManager.getCookie("id");
      Id= userId;
      if (!userId) {
        console.error('No UserId found in cookies');
        return null;
      }
  
      const requestBody = {
        UserId: userId
      };
  
      const response = await fetch('http://localhost:8000/GetUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const data = await response.json();
  
      if (!data.User.Imagen || !data.User.ImageData) {
        throw new Error('Image data is missing');
      }
  
      // Convert LongBlob to base64 string
     // const base64Image = `data:${data.User.ImageData};base64,${Buffer.from(data.User.Imagen).toString('base64')}`;
      
      var base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`; //campaña

        data[key].Imagen = base64Image;
        
        base64Image = `data:${data[key].ImagenUsuario};base64,${Buffer.from(data[key].ImagenUsuario).toString('base64')}`; //usuario
        data[key].ImagenUsuario = base64Image;

      const user = {
        ...data,
        profileImage: base64Image
      };
  
      return user;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
  };



import UserCampaignsCard from "../components/UserCampaignsCard";

export default function UserCampaigns(){
    const router = useRouter()
    const [campaña, setcampaña] = useState([]);
    const theme = useTheme();

    var CampañaUsuario = new Array();

    const userCampaignsData = [{"username": "Erika",  "campaignName": "Test 1"}, {"username": "Juan", "campaignName": "Test 2"}]
    const cambiarPagina = () => {
        //base de datos
        router.push('/CreateCampaigns', { scroll: false })
        
      };
      const [user, setUser] = React.useState(null);
     useEffect(() => {
        const fetchUser = async () => {
          const userData = await GetUser();
          setUser(userData);
          
        };
        fetchUser();
        BuscarCampañas();
      }, []);
      async function BuscarCampañas() {
        try {
            const response = await fetch('http://localhost:8000/tuscampa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ IDu:Id })
            });
            const data = await response.json();
            
            if (response.ok) {
              for(const key in data){
           
                const base64Image = `data:${data[key].Imagen};base64,${Buffer.from(data[key].Imagen).toString('base64')}`;
              
                data[key].Imagen = base64Image;
    
                var fecha = new Date(data[key].Fecha);
                fecha = fecha.getFullYear()+'-' + (fecha.getMonth()+1)+'-' + fecha.getDate();
                data[key].Fecha = fecha;
            }

              CampañaUsuario = data;
              setcampaña(data);
              console.log('informacion en la variable CampañaUsuario:',CampañaUsuario);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('error al buscar:', error.message);
        }
    }

    return(

    
        <div>
           <Grid item xs={12} md={4}>
        
        </Grid>
        <Grid item xs={12} md={8}>
                <Box sx={{ 
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "left",
                p: 5,
                m:5,
                flexDirection: "column",
               
                }}>
                <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mb: 4
                    }}>
                        
                        <Button variant="contained" sx={{ mb: 4 }} onClick={cambiarPagina}>Crear campaña</Button>
                
                    </Box>
                    
                    <Typography color={theme.palette.secondary.main} variant="h4">Tus campañas</Typography>

            </Box>
            {
            campaña.length>0 && campaña.map((camp,index)=>(
              <UserCampaignsCard  key={index}  camp={camp}></UserCampaignsCard>
    
              ))}
            </Grid>
           


           
        </div>
    );
}