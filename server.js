const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get all shortcuts
app.get('/shortcuts', (req, res) => {
    db.query('SELECT * FROM shortcuts', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add new shortcut
app.post('/shortcuts', (req, res) => {
    const { name, url } = req.body;
    db.query('INSERT INTO shortcuts (name, url) VALUES (?, ?)', [name, url], (err, result) => {
        if (err) throw err;
        res.send('Shortcut added');
    });
});

// Update shortcut
app.put('/shortcuts/:id', (req, res) => {
    const { name, url } = req.body;
    const { id } = req.params;
    db.query('UPDATE shortcuts SET name = ?, url = ? WHERE id = ?', [name, url, id], (err, result) => {
        if (err) throw err;
        res.send('Shortcut updated');
    });
});

// Delete shortcut
app.delete('/shortcuts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM shortcuts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send('Shortcut deleted');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
