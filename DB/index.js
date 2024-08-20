const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Correct usage of express.json()
app.use(express.json());

// Define your MongoDB URI with a database name
const mongoUri = "mongodb+srv://ronberger40:GetLooseDB44@getloosemaincluster.jejhk.mongodb.net/";

module.exports = async function connect() {
  // Importing models
  require('../models/Questions');
  require('../models/DailyStatistic');
  require('../models/Packages');
  require('../models/Bars');
  require('../models/LiveGame');

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Could not connect to MongoDB:', e.message);
    process.exit(1);
  }
};
