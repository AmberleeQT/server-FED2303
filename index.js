const express = require('express');
// Create Node App
const app = express();

const dotenv = require('dotenv');
// run configuration
dotenv.config();

// Bring is database & models
const db = require('./db')
const User = require('./models/users');
const Post = require('./models/posts');

// Sync code to Database
db.sequelize.sync().then(() => {
    console.log('DB updated successfully')
})

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