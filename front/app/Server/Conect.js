
const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Description, FilterNone } = require('@mui/icons-material');



const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Maag201200.',
  database: 'misionboard',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



const app = express();
app.use(express.json());
app.use(cors()); // Allow CORS for all routes

// Endpoint for user registration
app.post('/register', upload.single('image'), async (req, res) => {
  const { username, password, fullName } = req.body;
  const image = req.file;

  console.log('Received registration request for username:', username);

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    const imageData = fs.readFileSync(image.path);
    console.log('Received registration request for image:', image);

    const [result] = await connection.execute(
      'INSERT INTO User (email, contra, nombre, imagen) VALUES (?, ?, ?, ?)',
      [username, password, fullName, imageData]
    );
    connection.release();

    if (result.affectedRows === 0) {
      console.log('User registration failed');
      return res.status(500).json({ message: 'User registration failed' });
    }

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully', user: { id: result.insertId, username, fullName, image :image.path } });
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request for username:', username);
  
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username
    const [rows] = await connection.execute('SELECT * FROM User WHERE Email = ?', [username],' And Contra= ?',[password]);
    connection.release();

    if (rows.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    console.log('User found in database:', user);

    // Compare hashed password from the database with the provided password

   
    

    // Successful login
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful', user: { id: user.idUser, username: user.Nombre } });
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//campañas
app.post('/createcampaigns',upload.single('image'), async (req, res) => {
  const { nameCampaign,desCampaign, numJugadores, currentPlayer,numEstrellas, linkDiscord, selectedTime, Fecha2 } = req.body;
  const image = req.file; 
  console.log('informacion recivida de campaña y son los siguientes:');
  console.log('titulo:',nameCampaign);
  console.log('desc: '+desCampaign);
  console.log('numero de jugadores: '+numJugadores);
  console.log('currentplayers: '+currentPlayer);
  console.log('destrellas: '+numEstrellas);
  console.log('link: '+ linkDiscord);
  console.log('hora: '+ selectedTime);
  console.log('fecha:  '+ Fecha2);
  console.log('imagen: '+ image);
const fecha = new Date();

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    const imageData = fs.readFileSync(image.path);
    console.log('Received registration request for image:', image);

    // Query the database to get user details based on username
    console.log("continuamos antes");
    const rows = await connection.execute('insert into campaña (Titulo,Descripcion,MaxPlayers,CurrentPlayers,Estrellas,Link,Fecha,Horario,Imagen) Values (?,?,?,?,?,?,?,?,?)',[nameCampaign,desCampaign,numJugadores,numJugadores/*cambiar por nombre de usuario*/,numEstrellas,linkDiscord,Fecha2,selectedTime,imageData]);
   
    

    console.log("continuamos");

    if(rows[0].insertId)
      {
        res.status(200).json("se logro insertar?");
      }
    else{
      return res.status(401).json({ message: 'Error al insertar' });
    }

  }
  catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
 

});

// busquedas 
app.post('/searchcampaign', async (req, res) => {
  const { filterName,filterRating,filterPlayersMax,Fecha,Hora } = req.body;
  console.log('nombre busqueda:', Fecha, Hora);
  
  
  
   
  console.log('nombre busqueda:', Fecha, Hora);
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username
    const [rows] = await connection.execute('call SP_BusquedaCampañas(?,?,?,?,?)',[filterName,filterRating,filterPlayersMax,Fecha,Hora]);
    connection.release();

    if (rows.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const campaña = rows[0];
    console.log('User found in database:', campaña);

    // Compare hashed password from the database with the provided password
    // Successful login
    console.log('Login successful');
    res.status(200).json(campaña);
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Serve images from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

