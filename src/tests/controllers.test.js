import request from 'supertest';
import app from '../app';

describe('Generating numbers', () => {
  describe('POST /generate', () => {
    it('should generate a ten digit number and return it', async () => {
      const {
        status,
        body: { data },
      } = await request(app).post('/generate');
      expect(status).toEqual(201);
      expect(data).toHaveProperty('number');
      expect(data.number).toHaveLength(10);
    });

    it('should generate multiple phone numbers when a number query is supplied', async () => {
      const {
        status,
        body: { data },
      } = await request(app).post('/generate?number=20');
      expect(status).toEqual(201);
      expect(data).toHaveProperty('numbers');
      expect(data.numbers).toHaveLength(20);
      expect(data.numbers[0]).toHaveLength(10);
    });
  });
});

describe('Fetching All Phone numbers', () => {
  describe('GET /all', () => {
    it('should fetch all phone numbers available', async () => {
      const {
        status,
        body: { data },
      } = await request(app).get('/all');
      expect(status).toEqual(200);
      expect(data).toHaveProperty('numbers');
      expect(data).toHaveProperty('total');
      expect(data.total).toBeGreaterThan(1);
    });
  });
});

describe('Sorting phone numbers and getting the minimum and maximum numbers', () => {
  describe('GET /sort', () => {
    it('should sort the phone numbers in ascending order', async () => {
      const {
        status,
        body: { data },
      } = await request(app).get('/sort');
      expect(status).toEqual(200);
      expect(data).toHaveProperty('numbers');
      expect(Number(data.numbers[1])).toBeGreaterThan(Number(data.numbers[0]));
    });

    it('should sort the phone numbers in descending order', async () => {
      const {
        status,
        body: { data },
      } = await request(app).get('/sort?desc=1');
      expect(status).toEqual(200);
      expect(data).toHaveProperty('numbers');
      expect(Number(data.numbers[0])).toBeGreaterThan(Number(data.numbers[2]));
    });

    it('should return the maximum and minimum phone numbers', async () => {
      const {
        status,
        body: { data },
      } = await request(app).get('/sort?desc=1');
      expect(status).toEqual(200);
      expect(data).toHaveProperty('minimum');
      expect(data).toHaveProperty('maximum');
      expect(Number(data.maximum)).toBeGreaterThan(Number(data.minimum));
    });
  });
});

describe('Empty storage', () => {
  it('fetch all should return a 404 error', async () => {
    await request(app).delete('/refresh');
    const { status } = await request(app).get('/all');
    expect(status).toEqual(404);
  });
  it('sort should return a 404 error', async () => {
    const { status } = await request(app).get('/sort');
    expect(status).toEqual(404);
  });
});
