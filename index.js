const express = require('express');
const app = express();
const dotenv = require('dotenv');
// bring in middleware
const sessionChecker = require('./middleware/sessionChecker')

// set up session the way express tells you to. -> config object!
const sessionConfig = {
  key:'example_test_session', 
  secret: 'secret!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 60000,
  }
}

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