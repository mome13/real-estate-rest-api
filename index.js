const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('./dbConnection');

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

// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server has been started'));
