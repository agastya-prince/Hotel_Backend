var express = require('express')
const app = express()

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const Person = require('./models/person');
const menuItem = require('./models/menuItem');

app.get('/', (req, res) => {
  res.send('Welcome to my host... How can I help you?')
})

// import the router files
const personRoutes = require('./routes/personRoutes'); // import the person routes
const menuRoutes = require('./routes/menuRoutes'); // import the menu routes

// use the router files


app.use('/person', personRoutes); // use the person routes
app.use('/menuItem', menuRoutes); // use the menu routes

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})