const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Person model defined in models/person.js

// POST METHOD to create a new person
router.post('/', async(req, res) => {
    try{
      const data = req.body; // req.body is the data sent from the client
  
      // create new person object using mongoose model
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET METHOD to get the person
router.get('/', async(req, res) => {
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