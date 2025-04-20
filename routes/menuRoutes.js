const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem'); // MenuItem model defined in models/menuItem.js

// POST METHOD to create a new menu item
router.post('/', async(req, res) => {
    try{
      const data = req.body; // req.body is the data sent from the client
  
      // create new menu item object using mongoose model
      const newMenuItem = new MenuItem(data);
  
      const response = await newMenuItem.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  
// GET METHOD to get the menu item
router.get('/', async(req, res) => {
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }
    catch(err){
      console.log('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

// GET METHOD to get a menu item by ID
router.get('/:categoryType', async(req, res) => {
    try
    {
        const categoryType = req.params.categoryType; // get the categoryType from the URL
        if (categoryType == 'starter' || categoryType == 'main_course' || categoryType == 'dessert')
        {
            const response = await MenuItem.find({ category: categoryType });
            console.log('data fetched');
            res.status(200).json(response);
        }
        else
        {
            res.status(404).json({ error: 'Invalid category type' });
        }
    }
    catch(err)
    {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router; // export the router to use in server.js