// Step 1 : Import mongoose & define the mongoDB URL
const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL = 'mongodb://localhost:27017/hotels' // replace hotels with database name
const mongoURL = process.env.MONGO_URL; 

// Step 2 : Set up the MongoDB connection
mongoose.connect(mongoURL)

// Step 3 : Access the Default Connection Object
const db = mongoose.connection;

//Step 4 & 5 : Define & Listen TO Event Listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server')
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err)
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

// Step 6 : Export the Database Connection Object
module.exports = db;