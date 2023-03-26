const mongoose = require('mongoose');
const request = require('supertest');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
});

/* Closing database connection after each test. */
afterEach((done) => {
  mongoose.connection.close();
  done();
});

describe('GET Sample', () => {
  it('should return nothing', async () => {
    expect(1 + 2).toBe(3);
  });
});
