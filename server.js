var express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config(); // load env variables from .env file

const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const port = process.env.PORT || 3000; // use the port from .env file or default to 3000

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Reuest made to : ${req.originalUrl}`);
  next(); // call the next middleware function in the stack
}
app.use(logRequest); // use the middleware function for all routes


app.use(passport.initialize());
//const localAuthMiddleware = passport.authenticate('local', { session: false }); // use local strategy for authentication
app.get('/', function(req, res) {
  res.send('Welcome to my host... How can I help you?')
})

const Person = require('./models/person');
const menuItem = require('./models/menuItem');

// import the router files
const personRoutes = require('./routes/personRoutes'); // import the person routes
const menuRoutes = require('./routes/menuRoutes'); // import the menu routes

// use the router files


app.use('/person', personRoutes); // use the person routes
app.use('/menu', menuRoutes); // use the menu routes


app.listen(port , () => {
  console.log('Server is running on port 3000')
})