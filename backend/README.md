## Back End

To run the back end:

`cd backend && yarn install && yarn dev`

The back end is a simple express application with a few basic HTTP routes:

- `/get-coins`: lists the currently available coins that can be purchased along with current market value for one coin
- `/get-inventory`: lists the user's currently owned inventory
- `/purchase-coin`: allows the user to purchase (or sell) a coin. To purchase submit a positive amount, or to sell submit a negative amount

There is also a websocket which may be connected to for providing real-time updates for price changes. Any new connections to the websocket results in the application data being reset.
