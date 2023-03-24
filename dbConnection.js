'use strict';
console.log('dev mode :', process.env.ENVIRONMENT === 'dev', process.env.DBURL);
const mongoose = require('mongoose');
const mongo = {
  uri:
    process.env.ENVIRONMENT === 'dev'
      ? `mongodb://localhost:27017/${process.env.dbName}`
      : process.env.DBURL,
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
