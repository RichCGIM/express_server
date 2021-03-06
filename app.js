const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! How are you? How are you?')
})

app.get('/test', (req, res) => {
  res.send("This is a message from the server! It has now changed")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})