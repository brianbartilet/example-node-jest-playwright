## Front End

To run the front end:

`cd frontend && yarn install && yarn dev`

The front end is a simple react based `vite` application. Basic features are the ability to view your current inventory, along with tickets for each coin that may be purchased. Buy and sell buttons are listed underneath a field for the amount of coins to buy.

The front end connects to the websocket in the back end for real-time updates.

## The Game

The current time is shown at the top of SDET Exercise - for simplicity, this is a simple integer value which steadily increases by one, each time an update happens (every 5 seconds).

You begin with $1000 which you can spend however you like, by purchasing any of the following coins:

- CoinA: Prices for this coin change randomly some integer amount between +5 and -5
- CoinB: Prices for this coin steadily increase by +1
- CoinC: The price for this coin surges to 200 in increments of +10, but alas - when 200 is reached, the price immediately plummets to 100 again.
- CoinD: The price for this coin changes based on how many of this coin you currently own. If you own an even number then the price doubles (to the moon!), but if odd, the price halves

Place some trades, and have some fun earning (or losing!) your $1000.

## Your SDET Task

Given all the above, verify that the application and the coin behaviours work as expected. Utilise your SDET skills and experience to make good judgement decisions around how best to test the application, and implement some automated tests to verify that the application does indeed work as intended.
