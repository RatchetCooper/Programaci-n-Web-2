"use client"
import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CookieManager from "../Cookies/Cookies";

const Fichas = () => {
  const [fichaId, setFichaId] = useState('');
  const [playerProfile, setPlayerProfile] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [race, setRace] = useState('');
  const [background, setBackground] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [story, setStory] = useState('');
  const [description, setDescription] = useState('');
  const [imageId, setImageId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [razas, setRazas] = useState([]);
  const [trasfondos, setTrasfondos] = useState([]);
  const [clases, setClases] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const id = CookieManager.getCookie('FichaId');
    if (id) {
      setFichaId(id);
      fetchFichaData(id);
      fetchSelectedItems();
    }

    const ownerCookie = CookieManager.getCookie('IsOwner');
    if (ownerCookie === 'true') {
      setIsOwner(true);
    }
  }, []);

  const fetchFichaData = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/getFicha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fichaId: id })
      });
      const data = await response.json();
      if (response.ok) {
        const { ficha, imagen } = data;
        setPlayerProfile(ficha.Owner);
        setCharacterName(ficha.Nombre);
        setRace(ficha.raza_idRaza);
        setBackground(ficha.Trasfondo_idTrasfondo);
        setCharacterClass(ficha.clase_idClase);
        setStory(ficha.Historia);
        setDescription(ficha.Descripcion);
        if (imagen) {
          setImageId(imagen.idImagen);
          setImageUrl(`data:${imagen.Tipo};base64,${Buffer.from(imagen.Imagen).toString('base64')}`);
        }
      } else {
        console.error('Failed to fetch ficha data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching ficha data:', error);
    }
  };

  const fetchSelectedItems = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getCharacterOptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRazas(data.razas);
        setTrasfondos(data.trasfondos);
        setClases(data.clases);
      } else {
        console.error('Failed to fetch character options:', data.message);
      }
    } catch (error) {
      console.error('Error fetching character options:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Update the image preview
    }
  };
  

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('fichaId', fichaId);
    formData.append('Owner', playerProfile);
    formData.append('Nombre', characterName);
    formData.append('raza_idRaza', race);
    formData.append('Trasfondo_idTrasfondo', background);
    formData.append('clase_idClase', characterClass);
    formData.append('Historia', story);
    formData.append('Descripcion', description);
    if (imageFile) {
      formData.append('imagen', imageFile);
    } else {
      formData.append('imagen_idImagen', imageId);
    }

    try {
      const response = await fetch('http://localhost:8000/updateFicha', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Datos guardados!');
      } else {
        const data = await response.json();
        console.error('Failed to save ficha data:', data.message);
      }
    } catch (error) {
      console.error('Error saving ficha data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8000/deleteFicha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fichaId })
      });
      if (response.ok) {
        alert('Ficha eliminada!');
        window.location.href = '/Characters' // Redirect to /Characters
      } else {
        const data = await response.json();
        console.error('Failed to delete ficha:', data.message);
      }
    } catch (error) {
      console.error('Error deleting ficha:', error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh', padding: 4, borderRadius: '20px' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ficha de Personaje
          </Typography>

      
          
          {imageUrl ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <img 
                src={imageUrl} 
                alt="Character" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: '300px', 
                  maxHeight: '300px', 
                  minWidth: '300px', 
                  minHeight: '300px', 
                  borderRadius: '10px', 
                  boxShadow: '0px 13px 20px rgba(0, 0, 0, 0.6)', 
                  border: '4px solid #ccc' 
                }} 
              />
            </div>
          ) : (
            <Typography variant="body1" color="error">
              You need to upload an image for this character.
            </Typography>
          )}

          {isOwner && (
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'block', margin: '20px 0' }}
            />
          )}

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

          <FormControl fullWidth margin="normal">
            <InputLabel id="race-label">Raza</InputLabel>
            <Select
              labelId="race-label"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              fullWidth
              disabled={!isOwner}
            >
              {razas.map((raza) => (
                <MenuItem key={raza.idRaza} value={raza.idRaza}>
                  {raza.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="background-label">Trasfondo</InputLabel>
            <Select
              labelId="background-label"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              fullWidth
              disabled={!isOwner}
            >
              {trasfondos.map((trasfondo) => (
                <MenuItem key={trasfondo.idTrasfondo} value={trasfondo.idTrasfondo}>
                  {trasfondo.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="class-label">Clase</InputLabel>
            <Select
              labelId="class-label"
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value)}
              fullWidth
              disabled={!isOwner}
            >
              {clases.map((clase) => (
                <MenuItem key={clase.idClase} value={clase.idClase}>
                  {clase.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

          {isOwner && (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
  Eliminar Ficha
</Button>

            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Fichas;
