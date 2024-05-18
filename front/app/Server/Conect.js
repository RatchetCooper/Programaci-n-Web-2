const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Description } = require('@mui/icons-material');




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

// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request for username:', username);
  
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username
    const [rows] = await connection.execute('SELECT * FROM User WHERE Nombre = ?', [username],' And Contra= ?',[password]);
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
app.post('/createcampaigns', async (req, res) => {
  const { nameCampaign,desCampaign, numJugadores, currentPlayer,numEstrellas, linkDiscord, selectedTime, selectedDate,imagen } = req.body;
  
  console.log('informacion recivida de campaña y son los siguientes:');
  console.log('titulo:',nameCampaign);
  console.log('desc: '+desCampaign);
  console.log('numero de jugadores: '+numJugadores);
  console.log('currentplayers: '+currentPlayer);
  console.log('destrellas: '+numEstrellas);
  console.log('link: '+linkDiscord);
  console.log('time: '+selectedTime);
  console.log('hrario:  '+ selectedDate);
  console.log('imagen: '+imagen);
const fecha = new Date();

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username
    console.log("continuamos antes");
    const rows = await connection.execute('insert into campaña (Titulo,Descripcion,MaxPlayers,CurrentPlayers,Estrellas,Link,Fecha,Horario,Imagen) Values (?,?,?,?,?,?,?,?,?)',[nameCampaign,desCampaign,numJugadores,numJugadores/*cambiar por nombre de usuario*/,numEstrellas,linkDiscord,selectedDate,selectedTime,imagen]);
   
    

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

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});




