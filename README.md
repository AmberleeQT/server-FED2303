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
