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
