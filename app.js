// import required modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
const port = 3000;

// Makes it easier to read JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'expressdb',
  port: 3306
})

// Get All Students
app.get('/students', (req, res) => {

  console.log("Fetching all students ...")

  const sql = 'SELECT * FROM student'
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('rows', rows);
    res.json(rows);
  });

  console.log('This is after going to the database!');
})

// Get Student By Id
// students/7
app.get('/students/:id', (req, res) => {

  console.log('params:', req.params);

  const id = req.params.id;
  console.log(`Fetching student with id ${id}...`);

  connection.query(
    `SELECT * FROM student WHERE id = ${id}`, 
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
})

// Login
app.post('/login', (req, res) => {
  console.log('trying to login!')

  connection.query(
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
app.post('/students', (req, res) => {
  console.log(`Creating student ... `)

  console.log('body', req.body)
 
  connection.query(
    `INSERT INTO student (name, sex) VALUES ('${req.body.name}','${req.body.sex}')`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

// Update a Student
app.put('/students/:id', (req, res) => {
  console.log('params:', req.params);
  const id = req.params.id;
  console.log("body:", req.body)

  connection.query(
      `UPDATE student SET name = '${req.body.name}', sex = '${req.body.sex}' ` +
      `WHERE id = ${id}`,
      (err, rows) => {
        if (err) throw err;
        res.send(rows);
      });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  console.log(`Delete student id [${req.params.id}]... `)

  connection.query(
    `DELETE FROM student WHERE id = ${req.params.id}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    });
});

// Listen
// localhost => 127.0.0.1
app.listen(port, () => {
  console.log(`Student app listening at http://localhost:${port}`)
})
