const mongoose = require('mongoose');
const locks = require('./routes/locks');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/smartlock')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/locks', locks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));