"use client";

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Colapsable from './Colapsable';
import { Button } from "@mui/material";

const SpellcastingSection = () => {
  const [spellcastingInfo, setSpellcastingInfo] = useState({
    class: '',
    ability: '',
    saveDC: '',
    attackBonus: ''
  });
  const [spells, setSpells] = useState({
    cantrips: [''],
    level1: [''],
    level2: [''],
    level3: [''],
    level4: [''],
    level5: [''],
    level6: [''],
    level7: [''],
    level8: [''],
    level9: ['']
  });

  const handleSpellcastingInfoChange = (e) => {
    const { name, value } = e.target;
    setSpellcastingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSpellChange = (level, index, value) => {
    const updatedSpells = { ...spells };
    updatedSpells[level][index] = value;
    setSpells(updatedSpells);
  };

  const addSpell = (level) => {
    const updatedSpells = { ...spells };
    updatedSpells[level].push('');
    setSpells(updatedSpells);
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '10px'
  };

  const renderSpellLevel = (level, label) => {
    return (
      <Box key={level} sx={{ marginBottom: '20px', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>{label}</h3>
        {spells[level].map((spell, index) => (
          <input
            key={index}
            type="text"
            value={spell}
            onChange={(e) => handleSpellChange(level, index, e.target.value)}
            placeholder="Nombre del Hechizo"
            style={inputStyle}
          />
        ))}
        <button onClick={() => addSpell(level)} style={{ marginBottom: '10px', padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>Agregar Hechizo</button>
      </Box>
    );
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ bgcolor: '#cfe8fc', borderRadius: '20px', padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Spellcasting</h2>
        <Grid container spacing={2}>
          {['class', 'ability', 'saveDC', 'attackBonus'].map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field}>
              <input
                type="text"
                name={field}
                value={spellcastingInfo[field]}
                onChange={handleSpellcastingInfoChange}
                placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                style={inputStyle}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('cantrips', 'Level 0 (Cantrips)')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level1', 'Level 1')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level2', 'Level 2')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level3', 'Level 3')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level4', 'Level 4')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level5', 'Level 5')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level6', 'Level 6')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level7', 'Level 7')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level8', 'Level 8')}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {renderSpellLevel('level9', 'Level 9')}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};





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
  const [proficiencias, setProficiencias] = useState([{ nombre: '' }]);
  const [equipamiento, setEquipamiento] = useState({ cp: '', sp: '', gp: '', ep: '', pp: '', items: [''] });
  const [historia, setHistoria] = useState('');
  const [savingThrows, setSavingThrows] = useState({
    fortaleza: '',
    destreza: '',
    constitucion: '',
    inteligencia: '',
    sabiduria: '',
    carisma: ''
  });
  const [skills, setSkills] = useState({
    acrobatics: '2',
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

  const handleProficienciaChange = (index, value) => {
    const nuevasProficiencias = [...proficiencias];
    nuevasProficiencias[index].nombre = value;
    setProficiencias(nuevasProficiencias);
  };

  const agregarProficiencia = () => {
    setProficiencias([...proficiencias, { nombre: '' }]);
  };

  const handleEquipamientoChange = (field, value) => {
    setEquipamiento((prevEquipamiento) => ({
      ...prevEquipamiento,
      [field]: value
    }));
  };

  const handleEquipamientoItemChange = (index, value) => {
    const nuevosItems = [...equipamiento.items];
    nuevosItems[index] = value;
    setEquipamiento((prevEquipamiento) => ({
      ...prevEquipamiento,
      items: nuevosItems
    }));
  };

  const agregarEquipamientoItem = () => {
    setEquipamiento((prevEquipamiento) => ({
      ...prevEquipamiento,
      items: [...prevEquipamiento.items, '']
    }));
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
            
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                
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

           
            {/* Nuevo contenedor para Equipamiento */}
            <Container maxWidth={false}>
              <Box sx={{ bgcolor: '#cfe8fc', borderRadius: '20px', padding: '20px' }}>
                <h3 style={{ textAlign: 'center' }}>Equipamiento</h3>
                
                 
          
                <button onClick={agregarEquipamientoItem} style={{ marginTop: '20px', marginBottom: '10px' }}>Agregar Equipamiento</button>
                {equipamiento.items.map((item, index) => (
                  <Grid container spacing={2} key={index} sx={{ marginBottom: '10px' }}>
                    <Grid item xs={12}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleEquipamientoItemChange(index, e.target.value)}
                        placeholder="Item"
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
            </Container>

          

          </Stack>
        </Grid>
      </Grid>
      <SpellcastingSection />

      <Button variant="contained" sx={{mb: 4}}>Crear personaje</Button>
    </div>
    
  );
}

export default BasePage;
