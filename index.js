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
db.connect().then((connection) => console.log(connection?.readyState));


// starting server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server has been started'));
