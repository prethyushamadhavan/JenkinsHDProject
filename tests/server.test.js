const request = require('supertest');
const app = require('../src/server');

describe('GET /', () => {
  it('responds with Hello, World!', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, 'Hello, World!', done);
  });
});
