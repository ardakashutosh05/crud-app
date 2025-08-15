const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'testdb-2.cp24ccc4chcf.ap-southeast-1.rds.amazonaws.com',
    user: 'root',
    password: 'py4rVk]cJx:(,^Y*8w97',
    database: 'testdb-2'
});

db.connect((err) => {
    if (err) throw err;
    console.log('✅ MySQL Connected...');
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create table with timestamps
app.get('/createTable', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS items(
            id INT AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        )
    `;
    db.query(sql, (err) => {
        if (err) throw err;
        res.send('✅ Items table created.');
    });
});

// Add item
app.post('/addItem', (req, res) => {
    const { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({ success: false, message: "Name is required" });
    }
    const sql = 'INSERT INTO items (name) VALUES (?)';
    db.query(sql, [name], (err) => {
        if (err) throw err;
        res.json({ success: true, message: "Item added successfully" });
    });
});

// Get items with search, sort, pagination
app.get('/getItems', (req, res) => {
    let { search, sort, page, limit } = req.query;
    search = search ? `%${search}%` : '%';
    sort = sort === 'desc' ? 'DESC' : 'ASC';
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const offset = (page - 1) * limit;

    const sql = `SELECT * FROM items WHERE name LIKE ? ORDER BY name ${sort} LIMIT ? OFFSET ?`;
    db.query(sql, [search, limit, offset], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update item
app.put('/updateItem/:id', (req, res) => {
    const { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({ success: false, message: "Name is required" });
    }
    const sql = `UPDATE items SET name = ? WHERE id = ?`;
    db.query(sql, [name, req.params.id], (err) => {
        if (err) throw err;
        res.json({ success: true, message: "Item updated successfully" });
    });
});

// Delete item
app.delete('/deleteItem/:id', (req, res) => {
    const sql = `DELETE FROM items WHERE id = ?`;
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ success: true, message: "Item deleted successfully" });
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${port}`);
});

