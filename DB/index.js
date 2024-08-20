const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Correct usage of express.json()
app.use(express.json());

// Remove unnecessary and incorrect middleware usage
// app.use(express());

const mongoUri = "mongodb+srv://asaf8071:GetLoose11235@cluster0.80otawd.mongodb.net/";

module.exports = async function connect() {
  // Importing models
  require('../models/Questions');
  require('../models/DailyStatistic');
  require('../models/Packages');
  require('../models/Bars');
  require('../models/LiveGame');

  try {
    return mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (e) {
    console.log('Could not connect to MongoDB:', e);
    process.exit(1);
  }
};
