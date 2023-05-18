const express = require('express');
const app = express();
const dotenv = require('dotenv');

const session = require('express-session')

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

app.use(session(sessionConfig)) // session manager, pass in sessionConfig

dotenv.config();

// Bring is database & models
const db = require('./db')
const User = require('./models/users');
const Post = require('./models/posts');

// Root-l;evel rout
app.post('/login', async (req, res) => {
  const username= req.body.username;
  const user = await User.findOne({
    where:{
      username
    }
  })
  if(user){
    req.session.userInfo = {username: user.username}
    req.session.save()
    res.redirect('user-view')
  } else {
    res.sendStatus(400)
  }
})

// View Engine
const { engine } = require('express-handlebars');
app.engine('handlebars', engine()) // registers app to use this particular view engine: 'engine', handler
app.set('view engine', 'handlebars') // register setting of the enginer
app.set('views', './view') // tell it where we will get the views


// Routers
const userRouter = require('./routers/users.router');
const viewsRouter = require('./routers/views/index')

db.sequelize.sync().then(() => {
    console.log('DB updated successfully');
});


const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
// Assign Roots for Routers
app.use('/users', userRouter);
app.use('/', viewsRouter)



app.listen(PORT, () => {
  console.log('Running server on port: ' + PORT);
});