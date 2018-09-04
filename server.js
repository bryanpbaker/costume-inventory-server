const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// require routes
const costumes = require('./routes/costumes');

// initialize app
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config and Connection
const db = process.env.MONGO_URI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log('Uh oh! ==>', error));

// Routes config
const namespace = '/api/v1';
app.use(`${namespace}/costumes`, costumes);

// assign port if an env port isn't provided
const port = process.env.PORT || 5000;

// start app
app.listen(port, () => console.log(`Server started on port ${port}`));
