
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/user');

const app = express();

//set headers for cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//init bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//connection to mongodb database
mongoose.connect('mongodb+srv://xxxxx:@xxxxx@xxxxx.xxxxx.mongodb.net/xxxxx?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Database connection success !'))
  .catch(() => console.log('Database connection failed !'));

//mongose option for findOneAndUpdate
mongoose.set('useFindAndModify', false);

//routes for users
app.use('/api/user', usersRoutes);

module.exports = app;
