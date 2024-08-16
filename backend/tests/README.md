# Backend Test Project
This project contains automated tests for the backend services of our application. The tests are designed to ensure the reliability and correctness of the backend API and WebSocket operations.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Strategy](#test-strategy)
- [Mind Map for Test Design](#mind-map-for-test-design)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
tests/
│
├── coins-ws.test.ts           
├── get-coins.test.ts          
├── get-inventory.test.ts      
├── purchase-coin.test.ts      
├── utilities.ts               
├── test-cases.km              
└── README.md                  
```

## Getting Started

To set up and run the backend tests, follow these steps:

**Install Dependencies:**

   Ensure you have Node.js installed, then run the following command in the project root directory to install all necessary dependencies:

   ```bash
   npm install
   ```

## Running Tests

Tests are executed using a test runner, which will automatically detect and run all test files within the `tests/` directory.

- **Test Command:**
  ```bash
  npm run test
  ```
  or
  ```bash
  yarn test
  ```

This command will run all test files and provide a summary of test results.


## Mind Map for Test Design

The `test-cases.km` file represents a mind map used for designing and organizing test cases. This visual approach helps in:

- Identifying all possible test scenarios and edge cases.
- Structuring test cases to cover both positive and negative paths.
- Ensuring comprehensive test coverage across different functionalities.

Using a mind map helps testers and developers understand the scope and depth of testing required, ensuring no critical cases are missed.

## Notes
- Install any mind map plugin to view `testcases.km` to view test cases
- Node version v18.20.4 
- NPM 10.7.0