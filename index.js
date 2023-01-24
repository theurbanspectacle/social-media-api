const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const thoughtRoutes = require('./routes/thought');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.use((req, res) => {
    res.status(404).send("404: Route not found.")
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia').then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
}).catch(error => {
  console.error('error girl!', error);
});
