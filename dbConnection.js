'use strict';
console.log('mode: ', process.env.NODE_ENV);
const mongoose = require('mongoose');
const mongo = {
  uri: process.env.MONGODB_URI,
  opt: {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  },
};
console.log(mongo.uri);
exports.connect = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(mongo.uri, mongo.opt).then(() => {
    return mongoose.connection;
  });
};
