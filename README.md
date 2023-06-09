## Day 1

1. Create index.js file
2. Initialize a project in the terminal with the command:
   > npm init
   > This allows you to create a package.json file
   > Entrypoint: where you file is going to start
3. Continue through prompts, accepting the default values.
   (We can edit them later if we want to)
4. Modules (CJS and ECMAScript)
   ES: import module from 'module-name';
   CJS: const module = require('module-name');
   This is the most common syntax that will be used with node applications.
5. install express

- npmjs.com
- express
- in terminal: npm i express

6. node_modules folder

- filled with directories and dependencies that are required by the installed packages

7. add .gitignore
   /node_modules

8. in package.json

- devDependencies vs dependencies

9. copy initial code from npmjs for express

10. ctrl + hover + click --> takes you to the code explaining what things are

11. Run your applications
    npm run start

12. Debugging

- !! Make sure you terminal your application in regular terminal !!
  > ctrl + c
  > https://stackoverflow.com/questions/61908509/node-js-debugger-address-already-in-use
- go to debugger
- create a launch.json file
- click on node.js
- click on green play icon to start the debugger

13. Why debug?

- Add breakpoints to see the value of your code.

14. Check out variables in the debug console

- local
  -- req
  -- res
  --- \_closed: false --> this is because there is a breakpoint there
  -- this
- closure
- global

15. Current code:
    const express = require('express') // imports express
    const app = express() // creates the node application

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
res.send('Hello World')
})

app.listen(PORT, () => {
console.log('Running server on port: ' + PORT)
})

16. Adding more endpoints

const express = require('express') // imports express
const app = express() // creates the node application

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
res.send('Hello World')
})

app.post('/data', (req, res) => {
const body = req.body; // 2. DO need a piece of code called middleware
res.status(200).json(body); // 1. No return needed because res will automatically terminate the connection

// Middleware - why do we need it?
// Think: What is the data type of `req.body` we are sending?
// Answer: It's a string because JSON is string representation
// We need to convert this string into an object we can read.
// body-parser
})

app.listen(PORT, () => {
console.log('Running server on port: ' + PORT)
})

17. express body-parser
    https://expressjs.com/en/resources/middleware/body-parser.html

- follow installation command and API usage

18. What is a middleware?

- Within the API Layer, take an incoming request before it hits the endpoint, modifies that request (eg, parsing the body), then spits it back out to the endpoint
- Also takes an outgoing response, modifies it, and spits it out to the client

19. Add body-parser middleware to app
    const express = require('express');
    const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Create Node App
const app = express();

// Middleware
app.use(bodyParser.json())

app.get('/', function (req, res) {
res.send('Hello World')
})

app.post('/data', (req, res) => {
const body = req.body;
res.status(200).json(body);
})

app.listen(PORT, () => {
console.log('Running server on port: ' + PORT)
})

20. Use console to make a fetch api call
    fetch('http://localhost:3000/data', {
    headers:{
    'Content-Type':'application/json',
    },
    method: 'post',
    body: JSON.stringify({
    dan:true,
    darrell:false,
    })
    }).then(res => {
    if(!res.ok){
    throw res
    }
    return res.json()
    }).then(data => console.log(data)).catch(err => console.warn(err));

21. Notice how body has a value afte the breakpoint

22. What happens with status code 400?
    `res.status(400)` results in a hanging connection
    `res.sendStatus(400)` is used when just sending a status w/o data

23. HTTP method patterns
    Same pattern is followed for POST, PUT, PATCH, and DELETE
    Note: DELETE and GET do not have a body -> user query parametes instead

24. Query parameters

- how GET and DELETE get their endpoints
- http://localhost:3000/data?param1=42&params=john
- `?` initiates query
- `param=value`
- `&` links multiple queries together

25. modify app.post() to include params

app.post('/data', (req, res) => {
[BREAKPOINT] const body = req.body;
[BREAKPOINT] const params = req.params;
res.status(200).json(body);
})

26. Run fetch call in the console

fetch('http://localhost:3000/data?param1=42&params2=john', {
headers:{
'Content-Type':'application/json',
},
method: 'post',
body: JSON.stringify({
dan:true,
darrell:false,
})
}).then(res => {
if(!res.ok){
throw res
}
return res.json()
}).then(data => console.log(data)).catch(err => console.warn(err));

27. Save and refresh debugger
28. Step over to `res.status`

- this will give body and params values

29. What is the params an empty object?

- Go to req variable
- Check out 'params' -> it's empty, too.
- Check out query -> Hey! there's our parameters!

30. Why is it this way?

- 'query' -> 'query params' -> 'params'
- 1. The creators of express and node wanted it that way
- 2. The work around is to use another middleware to move the 'query' object to 'params'

31. Workarounds are how devs make things follow the same convention everyone else is using.

32. Change the pointer
    app.post('/data', (req, res) => {
    [BREAKPOINT] const body = req.body;
    [BREAKPOINT] const params = req.query;
    res.status(200).json(body);
    })

33. Next problem:

- Why are you using queries?
- What are the data types?

34. The data type will always be a string

- URLs are always a string.
- you will need to convert numbers, objects, etc into the appropriate data type later on.

## Day 2

35. Install Postman
    > https://www.postman.com/downloads/

- download and run installer
- When prompted to sign in or create an account, select ' Skip and go to app' in the footer

36. Install MySQL
    > https://dev.mysql.com/downloads/mysql/

- download and run installer
- Setup Type: Developer Default
- Check Requirements: You may need to install python. Follow the link, install with defaults. Review documentation at your own leisure. Click [ Next > ]
- Proceed through with defaults
- Accounts and Roles: This is where you will be asked for a password
  Create a new one or leave it blank. Either way, you MUST remember what you did. It is difficult to reset a ROOT password
- Continue on with defaults.

37. Install dbeaver (database client)
    > https://dbeaver.io/download/

- Download and run installer
- Complete with defaults

38. Documentation Links

    > https://www.python.org/downloads/ > https://docs.python.org/3.11/tutorial/index.html > https://docs.python.org/3.11/index.html > https://docs.python.org/3.11/using/windows.html > https://docs.python.org/3.11/whatsnew/3.11.html > https://dev.mysql.com/doc/mysql-shell/8.0/en/ > https://dev.mysql.com/blog-archive/introducing-mysql-innodb-replicaset/ > https://dev.mysql.com/blog-archive/ > https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-innodb-cluster-setting-up-a-real-world-cluster/ > https://dev.mysql.com/blog-archive/mysql-innodb-cluster-changing-cluster-options-live/

39. How to get to MySQL server

- Mac: system preferences > MySQL > click [ run server ]
- Windows: services app > scroll down to and select MySQL80 -- You should see the options to `Stop`, `Pause`, and `Restart` your MySQL server

40. DBeaver

- New to DBeaver? You can opt into creating their sample database to explore features. Feel free to do so.
- Create a new server > Top left, below [File], click the blue connection with the green +
- Modal: Connect to a database > select MySQL > [ Next > ]
- Connection Settings > Server - Leave all as is
- Connection Settings > Authentication - Enter password
- Click [ Test Connection ... ] > fix errors, else click [Finish]
- You should now see `localhost - localhost:3306` in your Database Navigator
- Expand localhost > Databases
- Right click Databases folder - [ Create New Database ]
- Name that database `fed_2303` or something similar
- Yay! You've created a database
- Note that the `Tables` folder is empty

## Begin Coding!

41. Things to install

- npm i dotenv
-

42. What they do

- dotenv
  :: allows you to use environment files
  :: env files = most common way to configure a serve and environment w/o code

43. How to NOT hardcode a port

- create a file `.env`
- in .env file: `PORT = 80`
- in index,js: import dotenv
- run configuration: dotenv.config();

44. dotenv.config();

- looks through you files for .env file.

45. npm run start

- notice server is runnin on port 80 --> comes from the .env file

46. ?? const PORT = process.env.PORT || 3000

- process: the namespace in which a particular software is running on
- port: the address your software is listening on

## Database configuration

47. npm i mysql2

- database connector - take software an allows it to have a direct connection to the database

48. npm i sequelize

- ORM -> Object relational mapper
- generic orm for all sql based-databases
- Documentation: sequalize.org

49. Directories!
    /db
    /models
    /routers

50. Create DB connection

- Create file: /db/index.js
- !! Reference sequalize docs for the code !!
- 2 ways to create this connection
- i. individual configuration
- ii. connect string

51. Connect String

- has all configurations for a connection but condensed into a single string
- connector (MySQL) parses the connect string for the information

52. Object Implementation

- sequalize's standard way of making this connection

53. Database Conenction - /db/index.js

"use strict"; // turns off certain JS features for a more secured JS file

const config = {
username:'root',
// standard
password: '',
// Whatever you selected
database: 'fed_2303',
// your database
host:'127.0.0.1',
// standard unless you happen to have changed it
dialect: 'mysql'
// the database being interacted with
}

const db = {}
// placehold for db configuration
config.logging = console.log;
// register logger to see what is happening on the backend
// Note: Conventionally, classes are capitalized. Thats why const Sequalize is capitalized
const sequalize = new Sequelize(config);
// create a new instance of the Sequelize class, passing in the config object

// \** Holders next
db.sequalize = sequalize;
// store our *instance\* created for the db
db.Sequelize = Sequelize;
// re-export the class in case we need to make a second connection

module.exports = db;
// CommonJS module export method

54. Set up some tables - /models/index.js

- MySQL -> tables -> relational data -> tables with columns
- ORM -> allows you to use JS to create an object that a tbale is then built off of (Don't have to write the individual queries the table is based on)
- models: classes (object blueprints) of what our data should look like

55. models/index.js
    const fs = require('fs');
    // fs = file system
    // -> module provided to you by node
    // -> already has the bindings to work with whatever OS you are using
    // -> !! What you use to access any file in your system !!
    const path = require('path')
    // pre-built in node
    // allows you to work with paths in a standard way
    // Needed because Mac and Windows have different methods of accessing paths
    const db = require('../db/index')
    // configuration we just wrote
    const baseName = path.basename(**filename)
    // **filename - global variable set by node
    // basename - start of your project, get me the path of the particular file

fs.readdirSync(\_\_dirname)
// syncronously read the file system, look at the present directory (models)
.filter((file)=> {
// filter through the current directory
// remove index.js and any file that is NOT a .js file
return (
file.indexOf(".") !== 0
// we don't want the file we are currently on
&& file !== baseName
// don't want the baseName file
&& file.slice(-3) === '.js'
// DO want the file with the '.js' extension
)
})

module.export = db;
// re-export the database
// this file basically loads every model into our db

56. create models for the database

- posts.js
- users.js

57. Users
    const { DataTypes } = require('sequelize');
    // enable data type mapping from our ORM
    const db = require('../db/index');
    // import DB configuration

const User = db.sequelize.define(
'users',
{
id: {
primaryKey: true,
autoIncrement: true,
type: DataTypes.INTEGER,
allowNull: false,
},
username:{
type: DataTypes.STRING,
allowNull: false
},
name:{
type: DataTypes.STRING,
},
address_1: {
type: DataTypes.STRING,
},
address_2: {
type: DataTypes.STRING,
},
city: {
type: DataTypes.STRING,
},
state: {
type: DataTypes.STRING,
},
postal_code: {
type: DataTypes.STRING,
},
primary_phone: {
type: DataTypes.STRING,
},
created_at: {
type: DataTypes.DATE,
},
last_modified: {
type: DataTypes.DATE,
}
},{
timestamps:true,
updatedAt:'last_modified',
createdAt:'created_at'
}
)

module.exports = User;

58. Posts
    const { DataTypes } = require('sequelize');
    const db = require('../db');

// create relationship between posts and users
const User = require('./users');
// one-to-many relationship. One user may have many posts

const Post = db.sequalize.define(
'Posts',
{
id: {
primaryKey: true,
autoIncrement: true,
type: DataTypes.INTEGER,
allowNull: false,
},
title: {
type: DataTypes.STRING,
allowNull: false,
},
content: {
type: DataTypes.STRING,
},
user_id: {
type: DataTypes.INTEGER,
allowNull: false,
},
created_at: {
type: DataTypes.DATE,
},
last_modified: {
type: DataTypes.DATE,
},
},
{
timestamps: true,
updatedAt: "last_modified",
createdAt: "created_at",
}
)

User.hasMany(Post, {
foreignKey:'user_id',
onDelete:'CASCADE',
onUpdate:'CASCADE'
})
// primaryKey - unique record in that table
// foreignKey - connects this record to another record in a different table

module.exports=Post;
// export so this can be loaded in our database

59. Load these up into the application database

- go back to entry point `index.js`
  // bring in DB and Models
  const db = require('./db')
  const User = require('./models/users');
  const Post = require('./models/posts');
  // Sync code to DB
  db.sequelize.sync().then(()=>{
  console.log('DB updated successfully')
  })

  - Note: work through error messages as needed.

60. Sync and confirm update to DBeaver database
    // Sync code to DB
    db.sequelize.sync().then(()=>{
    console.log('DB updated successfully')
    })

- .sync() is a promise, can use `async` and `await` if you want
- .then() -> Just what you want to do after the SQL statements are made.
- In terminal, note the raw SQL output. The ORM enables you to write out your objects describing the table itself. Yay!

- you should see 'posts' and 'users' in the tables folder

61. Knowledge checkin

- Models: A class. In terms of our 'users' and 'posts', objects defining the blueprints for a user and a post in our database

62. Routers

- Definition: A way to group your endpoints based on different things
- We will group our routes together based on the models we have creates

63. Controllers

- Definition: What actually does the logic at the endpoints / for the routes defined by the router

64. Router setup

- create top-level folders `/routers` and `/controllers`
- `/controllers/users.controller.js`
- `/router/users.router.js`
- Note the file naming syntax
- The routers and controllers are part of the MVC (Model View Controller) architecture.
- In this scenario, the browser is the 'view' in 'MVC'

65. Define users router and users controller for CRUD operations

- '... stub things out ...' :: This means that, for each endpoint, you will do the following three things:
- In `users.router.js`, name the handler as you set up each endpoint
- In `users.controller.js`, create the function definition for the handler and export it in your export object

66. Notes

- '/' -> root route specific to the router where it is defined
- Dynamic routing: '/:routeParam' -> convention followed _everywhere_
- Route handler naming convention: 'http...' -> most common convention, but not the only convention out there -> reminder that this is a route handler
- !! POST method: In this demo, POST is also used to UPDATE a user. This is what he does as work, so that is what he did here.

67. Export router from `users.router.js`
68. Export handlers in `users.controller.js`

69. Update main application file (entry point `index.js`) to use the user router
    ...
    const userRouter = require('./routers/users.router');
    ...
    app.use('/users', userRouter);
    ...

- Endpoints defined in user.router will be concatinated to this '/users' endpoint defined here

70. Test updated app in debugger

- Make sure all terminals have been terminated
- 'Run and Debug'

71. Open Postman

- GET : localhost:PORT/users
  where PORT is whatever port number you see in your debug terminal

- GET : localhost:80/users
- GET : localhost:80/users/234
- POST : localhost:80/users
- DELETE: localhost:80/users/234
- POST : localhost:80/users/update-user/234

72. Confirm router is configured correctly and commit

## Skiped to Templating

73. Topics

- templating using node
- components -> a piece of reusable UI
- Authentication and route guarding -> redirects
- Hash and why NOT store data as plain text -> Backend
- Passwords -> Backend

74. Review

- PORT, .env file, models (definition of your data), ORM, routers (defines your endpoints), controllers (logic for getting things done), MVC pattern, 2 ways to connect to DB (DBeaver uses a config object & MongoDb uses a connect string -> Ref documentation), .gitignore,

75. Session

- connectiontime in which you are connected to a server
- express-session

76. Storage

- SessionStorage - allows server to store things in your browser -> THEME (maybe LocalStorage)
- LocalStorage - persists
- DO NOT store PII -> if user is logged in, etc
- DO use for theme, tracking (elastic search), etc
- Cookies -> used for authentication

77. Cookies

- used for authentication
- stored as hash values -> encryption!

78. Hash values

- encryption
- VS Code automatically does this with your git commits
- run `git log` in terminal to see git commit history

79. Encryption

- Protect true values
- Give unique values
- Hashing? Must have an attached secret (stored in an env variable)
- Secret changed? Cannot unencrypt data

80. Install packages

- clear terminal
- run `npm i express-session`
- run `npm i handlebars`
- run `npm i express-handlebars` -> chandlebars connector
- Read documentation!

81. Create directories

- /middleware/sessionChecker.js
- this will be used to create a super simple session middleware

82. Create middleware

- checks if session exists
- checks if userInfo is set
- redirect to root page

83. Update entrypoint `index.js`

- import sessionChecker
- config session -> config object!
- 'key' -> session key you see in browser
- 'secret' -> want to accept your own session
- 'resave' -> Will you save to server for persistance or not?
- 'saveUninitialized' -> if session has been initialized the first time, save to database or not?
- 'cookie' -> object, actual value we are setting
- 'secure' -> 'false' allows this cookie to be used on other websites
- 'httpOnly' -> 'true' means we CANNOT use it in JS at all and frontend cannot access at all. This is very limiting, so we will use 'false'
- 'maxAge' -> when this cookie will expire ( in ms --> 60000 == 6 min)

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

84. import session manager

85. Set up views router and controller
86. Import just like userRouter
87. register view route middleware in view/index.js
88. register view engine

- View Engine : library to create output HTML
- place above routers in entrypoint

89. Make sure you have `./view`

90. `./view/layouts/main.handlebars`

- layouts:
- HTML
- mustache syntax: {{{body}}} -> dynamic variable in which the output will be displayed

91. `./view/partials`

- partials: little reusable pieces of code

92. Pages

- top-level in `./view`

93. After setting up view pages, partials, and layouts

- update view controller
