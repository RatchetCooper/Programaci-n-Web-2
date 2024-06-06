"use client";
import { Box, Button, Grid, Card, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import CookieManager from '../Cookies/Cookies.js';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import UserCampaignsCard from "../components/UserCampaignsCard";

var Id;

const GetUser = async () => {
  try {
    const userId = CookieManager.getCookie("id");
    Id = userId;
    if (!userId) {
      console.error('No UserId found in cookies');
      return null;
    }

    const requestBody = { UserId: userId };

    const response = await fetch('http://localhost:8000/GetUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();

    if (!data.User.Imagen || !data.User.ImageData) throw new Error('Image data is missing');

    const base64Image = `data:${data.User.ImageData};base64,${Buffer.from(data.User.Imagen).toString('base64')}`;

    const user = { ...data, profileImage: base64Image };

    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

export default function UserCampaigns() {
  const router = useRouter();
  const [campaña, setcampaña] = useState([]);
  const theme = useTheme();
  const [user, setUser] = useState(null);

  const cambiarPagina = () => {
    router.push('/CreateCampaigns', { scroll: false });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      BuscarCampañas();
    }
  }, [user]);

  async function BuscarCampañas() {
    try {
      const response = await fetch('http://localhost:8000/tuscampa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IDu: Id })
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

  return (
    <div>
      <Grid item xs={12} md={4}></Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "left", p: 5, m: 5, flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 4 }}>
            <Button variant="contained" sx={{ mb: 4 }} onClick={cambiarPagina}>Crear campaña</Button>
          </Box>
          <Typography color={theme.palette.secondary.main} variant="h4">Tus campañas</Typography>
        </Box>
        {campaña.length > 0 && campaña.map((camp, index) => (
          <UserCampaignsCard key={index} camp={camp} />
        ))}
      </Grid>
    </div>
  );
}