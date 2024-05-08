const { NODE_ENV } = process.env;
//if node_env is not production
if (!NODE_ENV || NODE_ENV === "development") {
  require('dotenv').config(); 
}

const express = require('express');
const cors = require('cors')
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
      res.status(204).send();
  }

  // res.status(204).send();
});

require('./routes/index')(app);

connect().then(() => {
  console.log('DB is connected');
  app.listen(PORT, () => {
    console.log('Server is up with express on port: ', PORT);
    console.log(process.env.NODE_ENV)
    //console.log(process.env.NODE_ENV)
  });
});
//http://localhost:3001
