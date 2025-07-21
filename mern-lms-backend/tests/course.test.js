const request = require('supertest');
const app = require('../src/app');

describe('Course API', () => {
  it('should fetch all courses', async () => {
    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});