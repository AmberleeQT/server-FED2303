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

const userRouter = require('./routers/users.router');

db.sequelize.sync().then(() => {
    console.log('DB updated successfully');
});


const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/users', userRouter);


app.listen(PORT, () => {
  console.log('Running server on port: ' + PORT);
});