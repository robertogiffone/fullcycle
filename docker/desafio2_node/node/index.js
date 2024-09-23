const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado no banco');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`;
    
    db.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Tabela "people" criada');

        const insertQuery = `INSERT INTO people (name) VALUES ('Roberto Giffone')`;
        db.query(insertQuery, (err) => {
            if (err) throw err;
            console.log('Registro inserido na tabela "people"');
        });
    });
});

app.get('/', (req, res) => {
    db.query('SELECT name FROM people', (err, results) => {
        if (err) throw err;

        let namesList = results.map(row => row.name).join('<br/>');
        res.send(`<h1>Full Cycle Rocks!</h1><br/>${namesList}`);
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});