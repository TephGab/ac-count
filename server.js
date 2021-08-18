const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const acRoutes = require('./routes/AcRoutes');
require('dotenv').config({path: '.env'});
const path = require('path');
require('./config/db');
const cors = require('cors');
// const jwt = require('jsonwebtoken');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
};

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
// app.use(cookieParser());

//routes
app.use('/api/ac', acRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}else{
  app.get('/', (req, res) => {
    res.send('Api ruinning');
  })
}

// server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});