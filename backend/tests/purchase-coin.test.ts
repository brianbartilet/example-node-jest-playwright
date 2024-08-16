import request from 'supertest';
import { app, Inventory, resetData } from '../src/index';
import { TestCase } from './utilities'

const req = request(app)
const endpoint = '/purchase-coin'

describe(endpoint, () => {
  beforeEach(async () => {
    resetData()
  });

  describe("FUNCTIONAL", () => {

    describe("User can purchase coin", () => {
      it('buy', async () => {
        const payload = { coinId: 2, amount: 1 }
        const response = await req.post(endpoint).send(payload);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('inventory');
        
        expect(Array.isArray(response.body.inventory)).toBe(true);
      });
    
      it('sell', async () => {
        const payloadBuy = { coinId: 2, amount: 1 }
        await req.post(endpoint).send(payloadBuy);
        
        const payloadSell = { coinId: 2, amount: -1 }
        const response = await req.post(endpoint).send(payloadSell);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('inventory');
        expect(Array.isArray(response.body.inventory)).toBe(true);
      });

      it('partial sell', async () => {
        const payloadBuy = { coinId: 2, amount: 2 }
        await req.post(endpoint).send(payloadBuy);
        
        const payloadSell = { coinId: 2, amount: -1 }
        const response = await req.post(endpoint).send(payloadSell);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('inventory');
        expect(Array.isArray(response.body.inventory)).toBe(true);
      });

    });
    
    describe("User can purchase multiple coins", () => {
      it('buy', async () => {
        const payload = { coinId: 1, amount: 1 }
        const response = await req.post(endpoint).send(payload);
        expect(response.statusCode).toBe(200);

        const payloadAnother = { coinId: 2, amount: 1 }
        const responseAnother = await req.post(endpoint).send(payloadAnother);
        expect(responseAnother.statusCode).toBe(200);


      });
    });
  })

  describe("INTEGRATION", () => {

    describe("Inventory is updated when purchase is completed", () => {
      const endpoint_inventory =  '/get-inventory'

      it('buy', async () => {
        // get initial inventory
        const responseInitialInventory = await req.get(endpoint_inventory);
        expect(responseInitialInventory.statusCode).toBe(200);
        //query the response that is a list with coinId = 2
        const initialInventory: Inventory[] = responseInitialInventory.body;
        const coinItem = initialInventory.find(item => item.coinId === 2);
        //check initial value
        expect(coinItem).toBeDefined();
        const prevAmount = coinItem ? coinItem.amountOwned : 0;

        const payload = { coinId: 2, amount: 1 }
        await req.post(endpoint).send(payload);

        // compare after purchase
        const response_after_inventory = await req.get(endpoint_inventory);

        //query the response that is a list with coinId = 2
        const updatedInventory: Inventory[] = response_after_inventory.body;
        const updatedCoinItem = updatedInventory.find((item) => item.coinId === 2);

        //check if value is greater than previous
        expect(updatedCoinItem?.amountOwned).toBeGreaterThan(prevAmount)
      });

      it('sell', async () => {
        // initial buy
        const payloadBuy = { coinId: 2, amount: 1 }
        await req.post(endpoint).send(payloadBuy);        
        
        // get initial inventory
        const responseInitialInventory = await req.get(endpoint_inventory);
        expect(responseInitialInventory.statusCode).toBe(200);
        //query the response that is a list with coinId = 2
        const initialInventory: Inventory[] = responseInitialInventory.body;
        const coinItem = initialInventory.find(item => item.coinId === 2);
        //check initial value
        expect(coinItem).toBeDefined();
        const prevAmount = coinItem ? coinItem.amountOwned : 0;

        const payload = { coinId: 2, amount: -1 }
        await req.post(endpoint).send(payload);

        // compare after purchase
        const response_after_inventory = await req.get(endpoint_inventory);

        //query the response that is a list with coinId = 2
        const updatedInventory: Inventory[] = response_after_inventory.body;
        const updatedCoinItem = updatedInventory.find((item) => item.coinId === 2);

        //check if value is less than previous
        expect(updatedCoinItem?.amountOwned).toBeLessThan(prevAmount)

      });

      it('partial sell', async () => {
        // initial buy
        const payloadBuy = { coinId: 2, amount: 2 }
        await req.post(endpoint).send(payloadBuy);

        // get initial inventory
        const responseInitialInventory = await req.get(endpoint_inventory);
        expect(responseInitialInventory.statusCode).toBe(200);
        //query the response that is a list with coinId = 2
        const initialInventory: Inventory[] = responseInitialInventory.body;
        const coinItem = initialInventory.find(item => item.coinId === 2);
        //check initial value
        expect(coinItem).toBeDefined();
        const prevAmount = coinItem ? coinItem.amountOwned : 0;

        const payload = { coinId: 2, amount: -1 }
        await req.post(endpoint).send(payload);

        // compare after purchase
        const response_after_inventory = await req.get(endpoint_inventory);

        //query the response that is a list with coinId = 2
        const updatedInventory: Inventory[] = response_after_inventory.body;
        const updatedCoinItem = updatedInventory.find((item) => item.coinId === 2);

        //check if value is less than previous
        expect(updatedCoinItem?.amountOwned).toBeLessThan(prevAmount)

      });

    });
    
  });

  describe("NEGATIVE", () => {
    
    it('User cannot buy a coin with insufficient balance', async () => {
      const payloadBuy = { coinId: 3, amount: 11 }
      const response = await req.post(endpoint).send(payloadBuy);
      expect(response.statusCode).toBe(400);
    });

    it('User cannot sell a coin not in his portfolio', async () => {      
      const payloadSell = { coinId: 3, amount: -1 }
      const response = await req.post(endpoint).send(payloadSell);
      
      expect(response.statusCode).toBe(400);
    });

    it('User cannot sell a coin amount more than available', async () => {
      const payloadBuy = { coinId: 2, amount: 2 }
      await req.post(endpoint).send(payloadBuy);
      
      const payloadSell = { coinId: 2, amount: -3 }
      const response = await req.post(endpoint).send(payloadSell);

      expect(response.statusCode).toBe(400);
    });

    it.skip('User cannot have negative balance', async () => {
    });

    function getTestCasesNegativeParameters() {
      const tests: Omit<TestCase, 'toString'>[] = [
        {
          description: '{coinId} INVALID TYPE',
          given: {
            parameters: {
              coinId: 'INVALID',
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },
        {
          description: '{coinId} ZERO VALUE',
          given: {
            parameters: {
              coinId: 0,
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },
        {
          description: '{coinId} NON EXISTENT',
          given: {
            parameters: {
              coinId: 10,
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },
        {
          description: '{coinId} NEGATIVE',
          given: {
            parameters: {
              coinId: -1,
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },
        {
          description: '{coinId} LARGE NUMBER',
          given: {
            parameters: {
              coinId: 999999999999999,
              amount: 1
            },
          },
          then: {
            response_code: 404 
          },
        },
        {
          description: '{coinId} LARGE NUMBER NEGATIVE',
          given: {
            parameters: {
              coinId: -999999999999999,
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },
        {
          description: '{coinId} NULL',
          given: {
            parameters: {
              coinId: null,
              amount: 1
            },
          },
          then: {
            response_code: 404
          },
        },

        {
          description: '{amount} ZERO',
          given: {
            parameters: {
              coinId: 2,
              amount: 0
            },
          },
          then: {
            response_code: 200
          },
        },
        {
          description: '{amount} LARGE NUMBER',
          given: {
            parameters: {
              coinId: 2,
              amount: 999999999999999
            },
          },
          then: {
            response_code: 400
          },
        },
        {
          description: '{amount} LARGE NUMBER NEGATIVE',
          given: {
            parameters: {
              coinId: 2,
              amount: -999999999999999
            },
          },
          then: {
            response_code: 400
          },
        },
      ];

      return tests.map((test) =>
        Object.assign({}, test, {
          toString: function (): string {
            return test.description;
          },
        })
      );
    }
    
    it.each(getTestCasesNegativeParameters())('%s', async function (test) {
      const payload = test.given.parameters
      const response = await req.post(endpoint).send(payload);
      expect(response.statusCode).toBe(test.then.response_code);
    });
    
  });

});
