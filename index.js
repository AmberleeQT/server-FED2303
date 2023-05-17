const express = require('express');
// Create Node App
const app = express();

const dotenv = require('dotenv');
// run configuration
dotenv.config();

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/data', (req, res) => {
  const body = req.body;
  const params = req.query;
  res.status(200).json(body);
})

app.listen(PORT, () => {
  console.log('Running server on port: ' + PORT)
})