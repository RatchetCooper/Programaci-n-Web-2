
const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cors = require('cors');

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

    // Read the image data and store it as a buffer
    const imageBuffer = fs.readFileSync(image.path);

    // Store the image data and its type in the database
    const [result] = await connection.execute(
      'INSERT INTO User (email, contra, nombre, imagen, imageData) VALUES (?, ?, ?, ?, ?)',
      [username, password, fullName, imageBuffer, image.mimetype]
    );
    connection.release();

    if (result.affectedRows === 0) {
      console.log('User registration failed');
      return res.status(500).json({ message: 'User registration failed' });
    }

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully', user: { id: result.insertId, username, fullName } });
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/deleteFicha', async (req, res) => {
  const { fichaId } = req.body;
  console.log('Received request to delete Ficha with ID:', fichaId);

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Start a transaction
    await connection.beginTransaction();

    // Delete the Ficha from the database
    const [result] = await connection.execute('DELETE FROM ficha WHERE idFicha = ?', [fichaId]);

    // Commit the transaction
    await connection.commit();
    connection.release();

    if (result.affectedRows === 0) {
      console.log('Ficha deletion failed');
      return res.status(500).json({ message: 'Ficha deletion failed' });
    }

    console.log('Ficha deleted successfully');
    res.status(200).json({ message: 'Ficha deleted successfully' });
  } catch (error) {
    console.error('Error executing query:', error.message);
    if (connection) await connection.rollback();
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/getUserFichas', async (req, res) => {
  const { userId } = req.body;
  console.log('Received request to get fichas for user ID:', userId);

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get all fichas for the user
    const [fichas] = await connection.execute('SELECT * FROM ficha WHERE Owner = ?', [userId]);
    connection.release();

    console.log('Fichas found in database:', fichas);

    res.status(200).json({ message: 'Fichas retrieved successfully', fichas });
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/createFicha', async (req, res) => {
  const { userId } = req.body;

  console.log('Received request to create Ficha for user ID:', userId);

  let connection;

  try {
    connection = await pool.getConnection();
    console.log('Database connection established');

    // Start a transaction
    await connection.beginTransaction();

    // Insert into Ficha
    const [fichaResult] = await connection.execute(
      'INSERT INTO ficha (Vida, VidaMac, VidaTemp, Defensa, Velocidad, Nivel, Owner) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [0, 0, 0, 10, 30, 1, userId]
    );
console.log("Ficha");
    const fichaId = fichaResult.insertId;

    // Query the first row from the clase table
    const [claseRow] = await connection.execute('SELECT idClase, Nombre, Descripcion, Vida FROM clase LIMIT 1');
    const claseId = claseRow[0].idClase;

    // Query the first row from the raza table
    const [razaRow] = await connection.execute('SELECT idRaza, Nombre, Descripcion FROM raza LIMIT 1');
    const razaId = razaRow[0].idRaza;

    // Query the first row from the trasfondo table
    const [trasfondoRow] = await connection.execute('SELECT idTrasfondo, Nombre, Descripcion FROM trasfondo LIMIT 1');
    const trasfondoId = trasfondoRow[0].idTrasfondo;

    // Insert into Seleccion with default values
    await connection.execute(
      'INSERT INTO seleccion (Clase_idClase, Raza_idRaza, Trasfondo_idTrasfondo, Ficha_idFicha, IdSeleccion) VALUES (?, ?, ?, ?, ?)',
      [claseId, razaId, trasfondoId, fichaId, null] // Assuming IdSeleccion is auto-incremented
    );

    // Commit the transaction
    await connection.commit();
    connection.release();

    console.log('Ficha created successfully');
    res.status(201).json({ message: 'Ficha created successfully', fichaId });
  } catch (error) {
    console.error('Error executing query:', error.message);
    if (connection) await connection.rollback();
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/updateUser', upload.single('image'), async (req, res) => {

  const { username, password, fullName, Id } = req.body;
  const image = req.file;

  console.log('Received update request for user:', Id);

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    let query = 'UPDATE User SET ';
    const params = [];

    if (username) {
      query += 'email = ?, ';
      params.push(username);
    }
    if (password) {
      query += 'contra = ?, ';
      params.push(password);
    }
    if (fullName) {
      query += 'nombre = ?, ';
      params.push(fullName);
    }
    if (image) {
      const imageBuffer = fs.readFileSync(image.path);
      query += 'imagen = ?, imageData = ?, ';
      params.push(imageBuffer, image.mimetype);
    }

    if (params.length === 0) {
      console.log('No valid fields to update');
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    query = query.slice(0, -2); // Remove the trailing comma and space
    query += ' WHERE idUser = ?';
    params.push(Id);

    const [result] = await connection.execute(query, params);
    connection.release();

    if (result.affectedRows === 0) {
      console.log('User update failed');
      return res.status(500).json({ message: 'User update failed' });
    }

    console.log('User updated successfully');
    res.status(200).json({ message: 'User updated successfully' });
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

    // Query the database to get user details based on username and password
    const [rows] = await connection.execute('SELECT idUser FROM User WHERE Email = ? AND Contra = ?', [username, password]);
    connection.release();

    if (rows.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    console.log('User found in database:', user);

    // Successful login
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful', userId: user.idUser });
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/GetUser', async (req, res) => {
  const { UserId } = req.body;
  console.log('Received login request for username:', UserId);
  
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username and password
    const [rows] = await connection.execute('SELECT * FROM User WHERE idUser = ?', [UserId]);
    connection.release();

    if (rows.length === 0) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    console.log('User found in database:', user);

    // Successful login
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful', User: user});
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//campañas
app.post('/createcampaigns',upload.single('image'), async (req, res) => {
  const { nameCampaign,desCampaign, numJugadores, currentPlayer,numEstrellas, linkDiscord, selectedTime, Fecha2,IdHost } = req.body;
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
  console.log('Idcreador'+ IdHost);
  console.log('imagen: '+ image);
const fecha = new Date();

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    const imageData = fs.readFileSync(image.path);
    console.log('Received registration request for image:', image);

    // Query the database to get user details based on username
    console.log("continuamos antes");
    const rows = await connection.execute('insert into campaña (Titulo,Descripcion,MaxPlayers,CurrentPlayers,Estrellas,Link,Fecha,Horario,Imagen,Host) Values (?,?,?,?,?,?,?,?,?,?)',/*hacer que le llege id el usuario*/[nameCampaign,desCampaign,numJugadores,0,/*cambiar por nombre de usuario*/,numEstrellas,linkDiscord,Fecha2,selectedTime,imageData,IdHost]);
   
    

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

app.post('/tuscampa', async (req, res) => {
  const { IDu } = req.body;
  console.log('id al buscar campaña:', IDu);

  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get campaigns based on user ID
    const [rows] = await connection.execute('SELECT IdCampaña, Titulo, Descripcion, MaxPlayers, CurrentPlayers, Estrellas, Link, Fecha, Horario, Imagen FROM campaña WHERE Host = ?', [IDu]);
    connection.release();

    if (rows.length === 0) {
      console.log('No campaigns found for this user');
      return res.status(401).json({ message: 'No campaigns found' });
    }

    console.log('Campaigns found:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//traer info para postularse
app.post('/infoCamp', async (req, res) => {
  const { Id } = req.body;
  console.log('id al buscar campaña especifica:', Id);
  
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on username and password
    const [rows] = await connection.execute('SELECT IdCampaña, Titulo, Descripcion, MaxPlayers, CurrentPlayers, Estrellas, Link, fecha, Horario, Imagen FROM campaña WHERE idCampaña = ?', [Id]);
    connection.release();

    if (rows.length === 0) {
      
    }

    const info = rows;
    console.log(info);

    // Successful login
    console.log('Login successful');
    res.status(200).json(info);
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//unirse a campaña
app.post('/UnirseCamp', async (req, res) => {
  const { IdCampaña,userId } = req.body;
  console.log('idcamp:',IdCampaña);
  console.log('iduser:',userId);


  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');
    const rows = await connection.execute('insert into CampañaUnirse (Id_Campaña,Id_Usuario,Id_unido) Values (?,?,true)',/*hacer que le llege id el usuario*/[IdCampaña,userId]);

    if(rows[0].insertId)
      {
        res.status(200).json("se logro unir?");
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

//buscar miembros campaña
app.post('/BuscarMiembros', async (req, res) => {
  const { IdCampaña } = req.body;
  
  console.log('id de la campaña a buscar miembros:', IdCampaña);
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on IDu
    const [rows] = await connection.execute('Select U.idUser,U.Nombre,U.Imagen,AU.Id_Campaña from user As U Inner Join CampañaUnirse AS AU on AU.Id_Usuario = U.idUser Inner join Campaña AS C on C.idCampaña = AU.Id_Campaña Where AU.Id_Campaña = ?', [IdCampaña]);
    connection.release();

    if (rows.length === 0) {
      console.log('No campaigns found for this user');
      return res.status(401).json({ message: 'No campaigns found' });
    }

    const info = rows;
    console.log('Miembros Encontrados:', info);

    // Successful response
    res.status(200).json(info);
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//explusar miembro
app.post('/ExplusarMiembro', async (req, res) => {
  const { IdExp,IdC } = req.body;
  
  console.log('id del miembro explusado:', IdExp);
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on IDu
    const [rows] = await connection.execute('Delete from CampañaUnirse where Id_Usuario = ? and Id_Campaña = ?', [IdExp,IdC]);
    connection.release();

    if (rows.length === 0) {
      console.log('No campaigns found for this user');
      return res.status(401).json({ message: 'No campaigns found' });
    }

    const info = rows;
    console.log('Miembros Encontrados:', info);

    // Successful response
    res.status(200).json(info);
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/BorrarCamp', async (req, res) => {
  const { IdC } = req.body;
  
 
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get user details based on IDu
    const [rows] = await connection.execute('Delete from Campaña where idCampaña = ?', [IdC]);
    const [rows2] = await connection.execute('Delete from CampañaUnirse where Id_Campaña = ?',[IdC]);
    connection.release();

    if (rows.length === 0) {
      console.log('no se encontro la campaña');
      return res.status(401).json({ message});
    }

    const info = rows;
    console.log('campaña eliminada:', info);

    // Successful response
    res.status(200).json(info);
 
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/LandCam', async (req, res) => {


  try {
    const connection = await pool.getConnection();
    console.log('Database connection established');

    // Query the database to get campaigns based on user ID
    const [rows] = await connection.execute('select * from campaña order by idCampaña desc  limit 2');
    connection.release();

    if (rows.length === 0) {
      console.log('No campaigns found for this user');
      return res.status(401).json({ message: 'No campaigns found' });
    }

    console.log('Campaigns found:', rows);
    res.status(200).json(rows);
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

