import request from 'supertest';
import app from '../app';

describe('Visiting the home route', () => {
  describe('GET /', () => {
    it('should return 200 OK', async () => {
      const response = await request(app).get('/');
      expect(response.status).toEqual(200);
    });

    it('should return 404 for an undefined route', async () => {
      const response = await request(app).get('/undefined');
      expect(response.status).toEqual(404);
    });
  });
});
