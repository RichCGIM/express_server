// THIS IS IN LONDON

// import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const $express = express();
$express.use(cors());
const port = 3000;

// Makes it easier to read JSON
$express.use(express.json())
$express.use(express.urlencoded({extended: true}))

const databaseConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'expressdb',
})

// Get All Students
$express.get('/students', (req, response) => {
  const sql = 'SELECT * FROM student';
  databaseConnection.query(sql, (err, rows) => {
    if (err) throw err;
    response.json(rows);
  });
})

// Get Student By Id
// students/7
$express.get('/students/:id', (req, res) => {

  console.log('params:', req.params);

  const id = req.params.id;
  console.log(`Fetching student with id ${id}...`);

  databaseConnection.query(
    `SELECT * FROM student WHERE id = ${id}`, 
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
})

// Login
$express.post('/login', (req, res) => {
  console.log('trying to login!')

  databaseConnection.query(
    'do the sql!',
    (err, rows) => {
      if (err) throw err;

      if (rows.length !== 1) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  )
})

// Create a Student
$express.post('/students', (request, res) => {
  console.log(`Creating student ... `)

  console.log(`request`, request);

  console.log('body', request.body)
 
  databaseConnection.query(
    `INSERT INTO student (name, sex) VALUES ('${request.body.name}','${request.body.sex}')`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

// Update a Student
$express.put('/students/:id', (req, res) => {
  console.log('params:', req.params);
  const id = req.params.id;
  console.log("body:", req.body)

  databaseConnection.query(
      `UPDATE student SET name = '${req.body.name}', sex = '${req.body.sex}' ` +
      `WHERE id = ${id}`,
      (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
});

// Delete a student
$express.delete('/students/:id', (req, res) => {
  console.log(`Delete student id [${req.params.id}]... `)

  databaseConnection.query(
    `DELETE FROM student WHERE id = ${req.params.id}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

// Listen
// localhost => 127.0.0.1
$express.listen(port, () => {
  console.log(`Student app listening at http://localhost:${port}`)
})
