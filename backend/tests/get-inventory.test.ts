import request from 'supertest';
import { app } from '../src/index';

const req = request(app)
const endpoint = '/get-inventory'

describe(endpoint, () => {

  describe('FUNCTIONAL', () =>{

    it('View current inventory', async () => {
      const response = await req.get(endpoint);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);

      const check = expect.arrayContaining([
        expect.objectContaining({
          coinId: expect.any(Number),
          amountOwned: expect.any(Number),
        }),
      ])
      expect(response.body).toEqual(check);
    });
  });

  describe('INTEGRATION', () =>{

  });

  describe('NEGATIVE', () =>{

  });

});
