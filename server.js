const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'nguyen1234',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

db.query('select * from candidates', (err, rows) => {
    console.log(rows);
});

// get a single candidate
db.query('select * from candidates where id =1', (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete a candidate
db.query('delete from candidates where id = ?', 1, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

// create a candidate
const sql = `insert into candidates (id, first_name, last_name, industry_connected)
                values (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

// default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});