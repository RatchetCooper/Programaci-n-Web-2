const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

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

// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await pool.getConnection();
    // Query the database to get user details based on username
    const [rows] = await connection.execute('SELECT * FROM User WHERE Nombre = ?', [username]);
    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];
    // Compare hashed password from the database with the provided password
    const passwordMatch = await bcrypt.compare(password, user.Contra);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', user: { id: user.idUser, username: user.Nombre } });
  } catch (error) {
    console.error('Error executing query:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
