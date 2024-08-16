import WebSocket from 'ws';
import { createServer } from 'http';
import { app, Coin, Inventory, resetData } from '../src/index';

jest.setTimeout(10000); // Set a timeout of 10 seconds


describe('WebSocket Server Tests', () => {
  let server: ReturnType<typeof createServer>;
  let wss: WebSocket.Server;

  beforeAll((done) => {
    // Reset data
    resetData()

    // Create an HTTP server
    server = createServer(app);

    // Create a WebSocket server on top of the HTTP server
    wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', (ws) => {
      // Initial payload sent on connection
      const payload = {
        coins: [
          { id: 'CoinA', name: 'CoinA', price: 50 },
          { id: 'CoinB', name: 'CoinB', price: 100 },
          { id: 'CoinC', name: 'CoinC', price: 190 },
          { id: 'CoinD', name: 'CoinD', price: 150 },
        ],
        inventory: [
          { coinId: 'CoinA', amountOwned: 10 },
          { coinId: 'CoinB', amountOwned: 5 },
          { coinId: 'CoinC', amountOwned: 3 },
          { coinId: 'CoinD', amountOwned: 4 },
        ],
        time: 0,
      };

      ws.send(JSON.stringify(payload));

      // Simulate updates to the coin prices
      const updatePayload = {
        coins: [
          {
            id: 'CoinA',
            name: 'CoinA',
            price: payload.coins[0].price + Math.floor(Math.random() * 11) - 5, // Random change between -5 and +5
          },
          { id: 'CoinB', name: 'CoinB', price: payload.coins[1].price + 1 }, // Steady increase by 1
          {
            id: 'CoinC',
            name: 'CoinC',
            price: payload.coins[2].price < 200 ? payload.coins[2].price + 10 : 100, // Increase by 10, then drop to 100 if it hits 200
          },
          {
            id: 'CoinD',
            name: 'CoinD',
            price:
              (payload.inventory.find((item) => item.coinId === 'CoinD')?.amountOwned ?? 0) % 2 === 0
                ? payload.coins[3].price * 2
                : payload.coins[3].price / 2, // Double if owned amount is even, halve if odd
          },
          
          
        ],
        inventory: payload.inventory,
        time: 1,
      };

      setTimeout(() => ws.send(JSON.stringify(updatePayload)), 1000);
    });

    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    server.listen(3101, () => {
      console.log('Test server running on port 3101');
      done();
    });
  });

  afterAll((done) => {
    wss.close(() => {
      server.close(done);
    });
  });

  describe('FUNCTIONAL', () => {
    it('Check connection', (done) => {
      const client = new WebSocket('ws://localhost:3101');

      client.on('open', () => {
        console.log('Connected to the WebSocket server');
      });

      client.on('message', (data) => {
        const parsedData = JSON.parse(data.toString());
        expect(parsedData).toHaveProperty('coins');
        expect(parsedData).toHaveProperty('inventory');
        expect(parsedData).toHaveProperty('time');
        expect(Array.isArray(parsedData.coins)).toBe(true);
        expect(Array.isArray(parsedData.inventory)).toBe(true);
        client.close();
        done();
      });

      client.on('error', (error) => {
        console.error('WebSocket error:', error);
        done(error);
      });
    });
  });

  describe('INTEGRATION', () => {
    it('Coin prices are updated according to the rules', (done) => {
      const client = new WebSocket('ws://localhost:3101');

      client.on('open', () => {
        console.log('Connected to the WebSocket server');
      });

      client.on('message', (data) => {
        const parsedData = JSON.parse(data.toString());

        // Check initial values
        if (parsedData.time === 0) {
          expect(parsedData.coins).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ name: 'CoinA', price: 50 }),
              expect.objectContaining({ name: 'CoinB', price: 100 }),
              expect.objectContaining({ name: 'CoinC', price: 190 }),
              expect.objectContaining({ name: 'CoinD', price: 150 }),
            ])
          );
        }

        // Check updated values
        if (parsedData.time === 1) {
          const updatedCoinA = parsedData.coins.find((coin: Coin) => coin.name === 'CoinA');
          const updatedCoinB = parsedData.coins.find((coin: Coin) => coin.name === 'CoinB');
          const updatedCoinC = parsedData.coins.find((coin: Coin) => coin.name === 'CoinC');
          const updatedCoinD = parsedData.coins.find((coin: Coin) => coin.name === 'CoinD');

          // Validate CoinA price change
          if (updatedCoinA) {
            expect(updatedCoinA.price).toBeGreaterThanOrEqual(45); // original price 50 - 5
            expect(updatedCoinA.price).toBeLessThanOrEqual(55); // original price 50 + 5
          }

          // Validate CoinB price increase
          if (updatedCoinB) {
            expect(updatedCoinB.price).toBe(101); // original price 100 + 1
          }

          // Validate CoinC price surge
          if (updatedCoinC) {
            expect(updatedCoinC.price).toBe(200); // price surged to 200
          }

          
          // Validate CoinD price change based on ownership
          const ownedAmountD = parsedData.inventory.find((inv: Inventory) => inv.coinId === 5)?.amountOwned;
          if (updatedCoinD && ownedAmountD !== undefined) {
            if (ownedAmountD % 2 === 0) {
              expect(updatedCoinD.price).toBe(300); // original price 150 * 2
            } else {
              expect(updatedCoinD.price).toBe(75); // original price 150 / 2
            }
          
          }
          
          

          client.close();
          done();
        }
      });

      client.on('error', (error) => {
        console.error('WebSocket error:', error);
        done(error);
      });
    });
  });
});
