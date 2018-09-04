const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config and Connection
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch(error => console.log('ERROR', error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
