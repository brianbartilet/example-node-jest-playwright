import request from 'supertest';
import { app } from '../src/index';

const req = request(app)
const endpoint = '/get-coins'

describe(endpoint, () => {

  describe('FUNCTIONAL', () => {

    it('View available coins', async () => {
      const response = await req.get(endpoint);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      const check = expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
      expect(response.body).toEqual(check);
    });
  });

  describe('INTEGRATION', () => {

  });

  describe('NEGATIVE', () => {

  });
  
});
