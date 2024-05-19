"use client";

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Colapsable from './Colapsable';

function BasePage({ children }) {
  const [customBackground, setCustomBackground] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [stats, setStats] = useState({
    fortaleza: '',
    destreza: '',
    constitucion: '',
    inteligencia: '',
    sabiduria: '',
    carisma: ''
  });
  const [modificadores, setModificadores] = useState({
    modFortaleza: '',
    modDestreza: '',
    modConstitucion: '',
    modInteligencia: '',
    modSabiduria: '',
    modCarisma: ''
  });
  const [ataques, setAtaques] = useState([{ nombre: '', bonAtaque: '', danio: '', tipo: '' }]);
  const [savingThrows, setSavingThrows] = useState({
    fortaleza: '',
    destreza: '',
    constitucion: '',
    inteligencia: '',
    sabiduria: '',
    carisma: ''
  });
  const [skills, setSkills] = useState({
    acrobatics: '',
    animalHandling: '',
    arcana: '',
    athletics: '',
    deception: '',
    history: '',
    insight: '',
    intimidation: '',
    investigation: '',
    medicine: '',
    nature: '',
    perception: '',
    performance: '',
    persuasion: '',
    religion: '',
    sleightOfHand: '',
    stealth: '',
    survival: ''
  });
  const [armorClass, setArmorClass] = useState('');
  const [initiative, setInitiative] = useState('');
  const [speed, setSpeed] = useState('');
  const [maxHP, setMaxHP] = useState('');
  const [currentHP, setCurrentHP] = useState('');
  const [temporaryHP, setTemporaryHP] = useState('');
  const [deathSaves, setDeathSaves] = useState({
    successes: [false, false, false],
    failures: [false, false, false]
  });
  const [inspiration, setInspiration] = useState('');
  const [proficiencyBonus, setProficiencyBonus] = useState('');
  const [passiveWisdom, setPassiveWisdom] = useState('');
  const [characterInfo, setCharacterInfo] = useState({
    nombre: '',
    edad: '',
    estatura: '',
    peso: '',
    ojos: '',
    piel: '',
    cabello: '',
    clase: '',
    nivel: '',
    trasfondo: '',
    raza: '',
    alineamiento: '',
    puntosExperiencia: ''
  });
  const [imageUrl, setImageUrl] = useState('');

  const handleStatChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9+-]*$/.test(value)) {
      setStats((prevStats) => ({
        ...prevStats,
        [name]: value
      }));
    }
  };

  const inputStyle = {
    width: '100%',
    height: '30px',
    marginTop: '5px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px'
  };

  const readOnlyInputStyle = {
    ...inputStyle,
    backgroundColor: '#e0e0e0'
  };

  const handleModifierChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9+-]*$/.test(value)) {
      setModificadores((prevModificadores) => ({
        ...prevModificadores,
        [name]: value
      }));
    }
  };

  const handleAtaqueChange = (index, field, value) => {
    const nuevosAtaques = [...ataques];
    nuevosAtaques[index][field] = value;
    setAtaques(nuevosAtaques);
  };

  const agregarAtaque = () => {
    setAtaques([...ataques, { nombre: '', bonAtaque: '', danio: '', tipo: '' }]);
  };

  const handleSavingThrowChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9+-]*$/.test(value)) {
      setSavingThrows((prevSavingThrows) => ({
        ...prevSavingThrows,
        [name]: value
      }));
    }
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9+-]*$/.test(value)) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [name]: value
      }));
    }
  };

  const handleDeathSaveChange = (type, index) => {
    setDeathSaves((prev) => ({
      ...prev,
      [type]: prev[type].map((val, i) => (i === index ? !val : val))
    }));
  };

  const handleCharacterInfoChange = (e) => {
    const { name, value } = e.target;
    setCharacterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      // Limpiar la URL de la imagen cuando el componente se desmonte
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Actualizar la información del personaje según las selecciones de la primera columna
  useEffect(() => {
    setCharacterInfo((prevInfo) => ({
      ...prevInfo,
      clase: selectedClass,
      trasfondo: selectedBackground,
      raza: selectedRace
    }));
  }, [selectedClass, selectedBackground, selectedRace]);

  return (
    <div>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Container maxWidth={false}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '95vh', borderRadius: '20px', padding: '10px' }}>
              <Colapsable Label="Raza">
                <div style={{ padding: '10px' }}>
                  <p
                    onClick={() => setSelectedRace('Humano')}
                    style={{ cursor: 'pointer', color: selectedRace === 'Humano' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedRace === 'Humano' ? 'lightblue' : 'black')}
                  >
                    Humano
                  </p>
                  <p
                    onClick={() => setSelectedRace('Elfo')}
                    style={{ cursor: 'pointer', color: selectedRace === 'Elfo' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedRace === 'Elfo' ? 'lightblue' : 'black')}
                  >
                    Elfo
                  </p>
                </div>
              </Colapsable>
              <Colapsable Label="Clase">
                <div style={{ padding: '10px' }}>
                  <p
                    onClick={() => setSelectedClass('Mago')}
                    style={{ cursor: 'pointer', color: selectedClass === 'Mago' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedClass === 'Mago' ? 'lightblue' : 'black')}
                  >
                    Mago
                  </p>
                  <p
                    onClick={() => setSelectedClass('Peleador')}
                    style={{ cursor: 'pointer', color: selectedClass === 'Peleador' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedClass === 'Peleador' ? 'lightblue' : 'black')}
                  >
                    Peleador
                  </p>
                </div>
              </Colapsable>
              <Colapsable Label="Trasfondo">
                <div style={{ padding: '10px' }}>
                  <p
                    onClick={() => setSelectedBackground('Noble')}
                    style={{ cursor: 'pointer', color: selectedBackground === 'Noble' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedBackground === 'Noble' ? 'lightblue' : 'black')}
                  >
                    Noble
                  </p>
                  <p
                    onClick={() => setSelectedBackground('Viajero')}
                    style={{ cursor: 'pointer', color: selectedBackground === 'Viajero' ? 'lightblue' : 'black' }}
                    onMouseEnter={(e) => (e.target.style.color = 'lightblue')}
                    onMouseLeave={(e) => (e.target.style.color = selectedBackground === 'Viajero' ? 'lightblue' : 'black')}
                  >
                    Viajero
                  </p>
                  <div>
                    <input
                      type="text"
                      placeholder="Agregar trasfondo"
                      value={customBackground}
                      onChange={(e) => setCustomBackground(e.target.value)}
                      style={{ width: '100%', marginTop: '10px', fontSize: '16px', borderRadius: '20px' }}
                    />
                    {customBackground && <p>{customBackground}</p>}
                  </div>
                </div>
              </Colapsable>
              <Box sx={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Estadísticas</h3>
                <Grid container spacing={2}>
                  {[
                    { label: 'Fortaleza', name: 'fortaleza', modName: 'modFortaleza' },
                    { label: 'Destreza', name: 'destreza', modName: 'modDestreza' },
                    { label: 'Constitución', name: 'constitucion', modName: 'modConstitucion' },
                    { label: 'Inteligencia', name: 'inteligencia', modName: 'modInteligencia' },
                    { label: 'Sabiduría', name: 'sabiduria', modName: 'modSabiduria' },
                    { label: 'Carisma', name: 'carisma', modName: 'modCarisma' },
                  ].map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '16px' }}>{stat.label}</label>
                        <div>
                          <input
                            type="text"
                            name={stat.name}
                            value={stats[stat.name]}
                            onChange={handleStatChange}
                            style={{
                              width: '70px',
                              height: '50px',
                              marginTop: '5px',
                              padding: '10px',
                              borderRadius: '5px',
                              border: '1px solid #ccc',
                              textAlign: 'center',
                              fontSize: '20px'
                            }}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name={stat.modName}
                            value={modificadores[stat.modName]}
                            onChange={handleModifierChange}
                            style={{
                              width: '40px',
                              height: '25px',
                              marginTop: '5px',
                              padding: '5px',
                              borderRadius: '5px',
                              border: '1px solid #ccc',
                              textAlign: 'center',
                              fontSize: '16px'
                            }}
                            placeholder="Mod"
                          />
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Ataques y Lanzamiento de Hechizos</h3>
                <button onClick={agregarAtaque} style={{ marginBottom: '10px' }}>Agregar Ataque/Hechizo</button>
                {ataques.map((ataque, index) => (
                  <Grid container spacing={2} key={index} sx={{ marginBottom: '10px' }}>
                    <Grid item xs={3}>
                      <input
                        type="text"
                        value={ataque.nombre}
                        onChange={(e) => handleAtaqueChange(index, 'nombre', e.target.value)}
                        placeholder="Nombre"
                        style={{
                          width: '100%',
                          padding: '5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '14px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        type="text"
                        value={ataque.bonAtaque}
                        onChange={(e) => handleAtaqueChange(index, 'bonAtaque', e.target.value)}
                        placeholder="Bon. Ataque"
                        style={{
                          width: '100%',
                          padding: '5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '14px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        type="text"
                        value={ataque.danio}
                        onChange={(e) => handleAtaqueChange(index, 'danio', e.target.value)}
                        placeholder="Daño"
                        style={{
                          width: '100%',
                          padding: '5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '14px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        type="text"
                        value={ataque.tipo}
                        onChange={(e) => handleAtaqueChange(index, 'tipo', e.target.value)}
                        placeholder="Tipo"
                        style={{
                          width: '100%',
                          padding: '5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '14px'
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Container>
        </Grid>

        <Grid xs={2}>
          <Container maxWidth={false}>
            <Box sx={{ bgcolor: '#cfe8fc', height: '105vh', borderRadius: '20px', padding: '10px' }}>
              <h3 style={{ textAlign: 'center' }}>Tiradas de Salvación</h3>
              <Grid container spacing={2}>
                {[
                  { label: 'Fortaleza', name: 'fortaleza' },
                  { label: 'Destreza', name: 'destreza' },
                  { label: 'Constitución', name: 'constitucion' },
                  { label: 'Inteligencia', name: 'inteligencia' },
                  { label: 'Sabiduría', name: 'sabiduria' },
                  { label: 'Carisma', name: 'carisma' },
                ].map((savingThrow, index) => (
                  <Grid item xs={12} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      style={{ marginRight: '10px' }}
                    />
                    <label style={{ fontSize: '16px', flex: '1' }}>{savingThrow.label}</label>
                    <input
                      type="text"
                      name={savingThrow.name}
                      value={savingThrows[savingThrow.name]}
                      onChange={handleSavingThrowChange}
                      style={{
                        width: '40px',
                        height: '25px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        fontSize: '16px'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Habilidades</h3>
              <Grid container spacing={2}>
                {[
                  { label: 'Acrobacias', name: 'acrobatics', stat: ' (Des)' },
                  { label: 'Manejo de Animales', name: 'animalHandling', stat: ' (Sab)' },
                  { label: 'Arcano', name: 'arcana', stat: ' (Int)' },
                  { label: 'Atletismo', name: 'athletics', stat: ' (Fue)' },
                  { label: 'Engaño', name: 'deception', stat: ' (Car)' },
                  { label: 'Historia', name: 'history', stat: ' (Int)' },
                  { label: 'Perspicacia', name: 'insight', stat: ' (Sab)' },
                  { label: 'Intimidación', name: 'intimidation', stat: ' (Car)' },
                  { label: 'Investigación', name: 'investigation', stat: ' (Int)' },
                  { label: 'Medicina', name: 'medicine', stat: ' (Sab)' },
                  { label: 'Naturaleza', name: 'nature', stat: ' (Int)' },
                  { label: 'Percepción', name: 'perception', stat: ' (Sab)' },
                  { label: 'Interpretación', name: 'performance', stat: ' (Car)' },
                  { label: 'Persuasión', name: 'persuasion', stat: ' (Car)' },
                  { label: 'Religión', name: 'religion', stat: ' (Int)' },
                  { label: 'Juego de Manos', name: 'sleightOfHand', stat: ' (Des)' },
                  { label: 'Sigilo', name: 'stealth', stat: ' (Des)' },
                  { label: 'Supervivencia', name: 'survival', stat: ' (Sab)' },
                ].map((skill, index) => (
                  <Grid item xs={12} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      style={{ marginRight: '10px' }}
                    />
                    <label style={{ fontSize: '16px', flex: '1' }}>{skill.label}<span style={{ opacity: '0.6' }}>{skill.stat}</span></label>
                    <input
                      type="text"
                      name={skill.name}
                      value={skills[skill.name]}
                      onChange={handleSkillChange}
                      style={{
                        width: '40px',
                        height: '25px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        fontSize: '16px'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Grid>

        <Grid xs={7}>
          <Stack spacing={2}>
            <Container maxWidth={false}>
              <Box sx={{ bgcolor: '#cfe8fc', height: '42vh', borderRadius: '20px', padding: '20px' }}>
                <Grid container spacing={2}>
                  {[
                    { label: 'Clase de Armadura', value: armorClass, setValue: setArmorClass },
                    { label: 'Iniciativa', value: initiative, setValue: setInitiative },
                    { label: 'Velocidad', value: speed, setValue: setSpeed },
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '16px' }}>{item.label}</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => item.setValue(e.target.value)}
                          style={{
                            width: '70px',
                            height: '50px',
                            marginTop: '5px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            textAlign: 'center',
                            fontSize: '20px'
                          }}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
                <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Puntos de Vida</h3>
                <Grid container spacing={2}>
                  {[
                    { label: 'Puntos de Vida Máximos', value: maxHP, setValue: setMaxHP },
                    { label: 'Puntos de Vida Actuales', value: currentHP, setValue: setCurrentHP },
                    { label: 'Puntos de Vida Temporales', value: temporaryHP, setValue: setTemporaryHP },
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{ fontSize: '16px' }}>{item.label}</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => item.setValue(e.target.value)}
                          style={{
                            width: '100%',
                            height: '50px',
                            marginTop: '5px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            textAlign: 'center',
                            fontSize: '20px'
                          }}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
                <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Puntos de Salvación</h3>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '16px' }}>Éxitos</label>
                      <div>
                        {[0, 1, 2].map((index) => (
                          <input
                            key={index}
                            type="checkbox"
                            checked={deathSaves.successes[index]}
                            onChange={() => handleDeathSaveChange('successes', index)}
                            style={{
                              marginLeft: '10px',
                              marginRight: '10px',
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '16px' }}>Fallos</label>
                      <div>
                        {[0, 1, 2].map((index) => (
                          <input
                            key={index}
                            type="checkbox"
                            checked={deathSaves.failures[index]}
                            onChange={() => handleDeathSaveChange('failures', index)}
                            style={{
                              marginLeft: '10px',
                              marginRight: '10px',
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                  <Grid item xs={4}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '16px' }}>Inspiración</label>
                      <input
                        type="text"
                        value={inspiration}
                        onChange={(e) => setInspiration(e.target.value)}
                        style={{
                          width: '70px',
                          height: '50px',
                          marginTop: '5px',
                          padding: '10px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '20px'
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '16px' }}>Bonificación de Proficiencia</label>
                      <input
                        type="text"
                        value={proficiencyBonus}
                        onChange={(e) => setProficiencyBonus(e.target.value)}
                        style={{
                          width: '70px',
                          height: '50px',
                          marginTop: '5px',
                          padding: '10px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '20px'
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontSize: '16px' }}>Sabiduría Pasiva (Percepción)</label>
                      <input
                        type="text"
                        value={passiveWisdom}
                        onChange={(e) => setPassiveWisdom(e.target.value)}
                        style={{
                          width: '70px',
                          height: '50px',
                          marginTop: '5px',
                          padding: '10px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          textAlign: 'center',
                          fontSize: '20px'
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            
            <Container maxWidth={false}>
              <Box
                sx={{
                  bgcolor: '#cfe8fc',
                  height: '60vh',
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'flex',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'block', margin: '10px auto' }}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Character"
                        style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '10px', marginTop: '10px' }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Nombre del Personaje</label>
                        <input
                          type="text"
                          name="nombre"
                          value={characterInfo.nombre}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Edad</label>
                        <input
                          type="text"
                          name="edad"
                          value={characterInfo.edad}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Estatura</label>
                        <input
                          type="text"
                          name="estatura"
                          value={characterInfo.estatura}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Peso</label>
                        <input
                          type="text"
                          name="peso"
                          value={characterInfo.peso}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Ojos</label>
                        <input
                          type="text"
                          name="ojos"
                          value={characterInfo.ojos}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Piel</label>
                        <input
                          type="text"
                          name="piel"
                          value={characterInfo.piel}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Cabello</label>
                        <input
                          type="text"
                          name="cabello"
                          value={characterInfo.cabello}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Clase</label>
                        <input
                          type="text"
                          name="clase"
                          value={characterInfo.clase}
                          onChange={handleCharacterInfoChange}
                          readOnly
                          style={readOnlyInputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Nivel</label>
                        <input
                          type="number"
                          name="nivel"
                          value={characterInfo.nivel}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Trasfondo</label>
                        <input
                          type="text"
                          name="trasfondo"
                          value={characterInfo.trasfondo}
                          onChange={handleCharacterInfoChange}
                          readOnly
                          style={readOnlyInputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Raza</label>
                        <input
                          type="text"
                          name="raza"
                          value={characterInfo.raza}
                          onChange={handleCharacterInfoChange}
                          readOnly
                          style={readOnlyInputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Alineamiento</label>
                        <input
                          type="text"
                          name="alineamiento"
                          value={characterInfo.alineamiento}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <label style={{ fontSize: '16px' }}>Puntos de Experiencia</label>
                        <input
                          type="number"
                          name="puntosExperiencia"
                          value={characterInfo.puntosExperiencia}
                          onChange={handleCharacterInfoChange}
                          style={inputStyle}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Stack>
        </Grid>
      </Grid>
      
    </div>
    
  );
}

export default BasePage;
