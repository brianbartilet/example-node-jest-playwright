# SDET Exercise

This exercise is to help us better understand your experience in writing integration tests and additionally testing APIs.

## Setup

The exercise consists of two apps that run on your local machine, a frontend app and a backend app. To complete the task you'll need to run both apps.

#1. First, start the backend by executing the following:

```
cd backend;
yarn install;
yarn dev;
```

#2. Second, start the frontend by executing the following:

```
cd frontend;
yarn install;
yarn dev;
```

## Task

We would like you to test both the frontend and backend apps with a few small tests. Below is a screen capture of what the frontend app looks like after it has been loaded.  Layout the tests in whatever folder structure and/or naming convention you deem sensible.

The Cypress tests should -

- on load of the front end
  - assert that you begin with a $1000 USD balance
  - assert that there are four coin options available
- after buying three coins
  - assert "Coins owned" has incremented by the quantity you provided
  - assert that the "Market value" correctly reflects the cost per coin.

The SuperWsTest tests should -

- when testing the endpoints
  - test for a successful response payload from the `purchase-coin` endpoint after a buy order is placed
- when testing the websocket
  - test that CoinB incremements by one dollar with each message over a period of time.
  - test that `inventory.<coinId>.amountOwned` correctly reflects your owned inventory following a `purchase-coin` execution.

Additional Notes

- Please spend as much time as you feel necessary to complete the task and show off your skills.
- We are looking for code quality and legibility, future-proofing concepts, code re-use, etc.
- Add comments where necessary or to document any assumptions/considerations you may have.

## Screen Capture

![Screenshot of SDET Exercise](sdet-exercise.png)

## CI Implementation
- [Simple CI setup](https://github.com/brianbartilet/example-node-jest-playwright/actions)
