"use client"
import { Box, Typography, Button, Stack } from "@mui/material";
import LandingCampaigns from "../components/LandingCampaigns";
import { useTheme } from '@mui/material/styles'; //esta va ligada al provider
import { useRouter } from 'next/navigation'
import CookieManager from '../Cookies/Cookies.js';
import React, { useState, useEffect } from "react";


  

export default function Landing(){
    const router = useRouter()
    const data = [{"username": "Erika",  "campaignName": "Nombre de la campaña 1"}, {"username": "Juan", "campaignName": "Nombre de la campaña 2"}]

    const [campaña, setcampaña] = useState([]);

    useEffect(() => {
            LandingCampañas();
      });

    const cambiarPagina = () => {
        //base de datos
        router.push('/Fichas', { scroll: false })//Poner el URL  de crear personaje
        
      };
      const cambiarPaginaBusqueda = () => {
        //base de datos
        router.push('/SearchCampaign', { scroll: false }) 
        
      };
      async function LandingCampañas() {
        try {
          const response = await fetch('http://localhost:8000/LandCam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ })
          });
    
          const data = await response.json();
          console.log('antes de modificar datos al recibirlos:',data);
          if (response.ok) {
            data.forEach(camp => {
              camp.Imagen = `data:image/jpeg;base64,${Buffer.from(camp.Imagen).toString('base64')}`;
              camp.Fecha = new Date(camp.Fecha).toISOString().split('T')[0];
            });
            
            
            setcampaña(data);
            console.log(data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error al buscar:', error.message);
        }
      }
    return(


        <div>
            <Box sx={{ 
                width: "100vw",
                height: "60vh",
                backgroundImage: 'url("./LandingImgs/portadatono.png")',
                backgroundSize: 'cover',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{ p:3, width: "50vw", backgroundColor:"rgba(0, 0, 0, 0.2)"}} >
                    <Typography variant="h4" sx={{
                        textAlign: "center",
                        color: "white"
                    }}>Somos una herramienta web gratuita que te vincula a las mejores campanas de calabozos y dragones</Typography>
                    <Typography variant="body1" sx={{
                        mt: 4,
                        textAlign: "center",
                        color: "white"
                    }}>Busca campañas por todo el mundo y unete a las mejores aventuras</Typography>
                </Box>
            </Box>

            <LandingCampaigns campaignData={ campaña } ></LandingCampaigns>

            <Stack sx={{  display: "flex",  alignItems: "center",}} >
            <h1>Busca campañas</h1> 
                    <Typography variant="body1" sx={{
                        textAlign: "center",
                        
                    }}>Nuevas busquedas, nuevos amigos</Typography>
               
              
          
            <Button variant="contained" sx={{mt: 4}} onClick={cambiarPaginaBusqueda}>Buscar campañas</Button>            
            </Stack>

            <Stack sx={{  display: "flex",  alignItems: "center",}} >
            <h1>Crea tus personajes</h1> 
                    <Typography variant="body1" sx={{
                        textAlign: "center",
                        
                    }}>Comienza con la creación de personajes para unirte a las aventuras que tenemos para ti</Typography>
               
              
          
            <Button variant="contained" sx={{mt: 4}} onClick={cambiarPagina}>Crear personaje</Button>            
            </Stack>
                
        </div>
    );
}