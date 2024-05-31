"use client";

import React, { useState } from 'react';
import { CssBaseline, Container, Box, TextField, Typography, Button } from '@mui/material';

const Fichas = ({ isOwner }) => {
  const [playerProfile, setPlayerProfile] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [race, setRace] = useState('');
  const [background, setBackground] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [story, setStory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', padding: 4, borderRadius: '20px' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ficha de Personaje
          </Typography>
          
          <TextField
            label="Perfil del Jugador"
            value={playerProfile}
            onChange={(e) => setPlayerProfile(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Nombre del Personaje"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Raza"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Trasfondo"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Clase"
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Historia"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          <TextField
            label="URL de Imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: !isOwner,
              style: { color: 'gray' }
            }}
          />

          {isOwner && (
            <Button variant="contained" color="primary" onClick={() => alert('Datos guardados!')}>
              Guardar
            </Button>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Fichas;
