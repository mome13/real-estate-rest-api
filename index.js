const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('./dbConnection');
const { ValidationError } = require('express-validation');

const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
// const uploadController = require('./controllers/uploadController');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connecting
db.connect().then((connection) =>
  process.env.NODE_ENV !== 'test'
    ? console.log(connection?.readyState)
    : connection
);

app.use('/auth', authController);
app.use('/property', propertyController);
// app.use('/upload', uploadController);

/* error handler
All 'next' will be arrived here with their specific error message
use errorMessage and status to throw a specific error
  throw {status: 407, errorMessage:'errrrror messsssssage'}*/
app.use(function (err, req, res, next) {
  console.log(err)
  if (err instanceof ValidationError) {
    return res.status(422).json({ message: err.message, err: err.details }); //EC: 7
  }

  res.status(err.status || 500).json({
    Error: err.status,
    message: err.errorMessage || 'An error occurred.',
  });
});

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server has been started'));
