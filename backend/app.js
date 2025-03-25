const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// ✅ Enable CORS globally and for preflight
app.use(cors());
app.options('*', cors());

// MySQL connection config
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'testdb'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
  } else {
    console.log('✅ Connected to MySQL database!');
  }
});

// Main route with manual CORS headers
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) {
      res.status(500).send('Error querying database.');
    } else {
      res.send('✅ Backend is connected to MySQL! Server time: ' + results[0].time);
    }
  });
});

app.listen(port, () => {
  console.log(`🌐 Server running on port ${port}`);
});