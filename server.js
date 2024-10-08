const { NODE_ENV } = process.env;
// If NODE_ENV is not production
if (!NODE_ENV || NODE_ENV === "development") {
  require('dotenv').config(); 
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const connect = require('./DB'); 
const PORT = process.env.PORT || 3001;
const app = express();    

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// Middleware to extract client IP address
app.use((req, res, next) => {
    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
});

// Route to get client IP address
app.get('/api/ip', (req, res) => {
    res.json({ ipAddress: req.clientIp });
});

// Health check route
app.use('/health', async (_req, res, _next) => {
  const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
  };
  try {
      res.send(healthcheck);
  } catch (error) {
      healthcheck.message = error;
      res.status(500).send(healthcheck);
  }
});

require('./routes/index')(app);

connect()
  .then(() => {
    console.log('DB is connected');
    app.listen(PORT, () => {
      console.log(`Server is up with express on port: ${PORT}`);
      console.log(process.env.NODE_ENV);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
    process.exit(1); // Exit the process if the DB connection fails
  });
