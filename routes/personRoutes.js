const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const  {jwtAuthMiddleware, generateToken} = require('../jwt');



// POST METHOD to create a new person
router.post('/signup', async(req, res) => {
    try{
      const data = req.body; // req.body is the data sent from the client
  
      // create new person object using mongoose model
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log('data saved');

      const payload = {
        id : response.id,
        username : response.username,
      }

      const token = generateToken(payload);
      console.log("Token is : ", token);

      res.status(200).json({response : response, token: token});
    }
    catch(err){
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

// LOGIN ROUTE
router.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;

    // find the user in the database
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({error: 'Invalid username or password'});
    }
    
    // generate token
    const payload = {
      id: user.id,
      username: user.username,
    }
    const token = generateToken(payload);

    // return tokem as response
    res.json({token})
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// PROFILE ROUTE
router.get('/profile', jwtAuthMiddleware, async(req, res) => {
  try {
    const userdata = req.user;
    console.log('User data:', userdata);

    const userId = userdata.id;
    const user = await Person.findById(userId);

    res.status(200).json(user);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})
// GET METHOD to get the person
router.get('/', jwtAuthMiddleware, async(req, res) => {
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  }
  catch(err){
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GET METHOD to get a person by ID
router.get('/:workType', async(req, res) => {
    try
    {
      const workType = req.params.workType; // get the workType from the URL
      if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager')
      {
        const response = await Person.find({ work: workType });
        console.log('data fetched');
        res.status(200).json(response);
      }
      else
      {
        res.status(404).json({ error: 'Invalid work type' });
      }
    }
    catch(err)
    {
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async(req, res) => {
  try
  {
    const personId = req.params.id; // extract the ID from the URL
    const updatedPersonData = req.body; // updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, { 
      new: true,// return the updated document
      runValidators : true // run Mongoose validation
    }) // update the person in the database

    if (!response) // if person not found
    {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('data updated');
    res.status(200).json(response); // send the updated person as the response
  }
  catch (err)
  {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete('/:id', async(req, res) => {
  try
  {
    const personId = req.params.id; // extract the ID from the URL

    const response = await Person.findByIdAndDelete(personId); // delete the person from the database
    if (!response) // if person not found
    {
      return res.status(404).json({ error: 'Person not found' });
    }
    
    console.log('data deleted');
    res.status(200).json({ message: 'Person deleted successfully' }); // send success message
  }
  catch (err)
  {
    console.log('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
module.exports = router; // export the router to use in server.js