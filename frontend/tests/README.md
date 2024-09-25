# Playwright Test Project

This project is designed to perform end-to-end testing on a web application using Playwright with Cucumber for BDD-style test scenarios.
## Installation
- `npm install`
- `npx playwright install`
## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Reports](#test-reports)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
tests/
│
├── config/                
│   └── cucumber.js            
│
├── src/
│   ├── hooks/              
│   │   └── hooks.ts
│   │
│   ├── pages/               
│   │   └── portfolio.ts        
│   │
│   └── test/
│       ├── features/          
│       │   ├── coins.feature
│       │   └── portfolio.feature
│       │
│       └── steps/            
│           └── coins.steps.ts
│
├── test-results/             
│   ├── cucumber-report.html
│   └── cucumber-report.json
│
├── .gitignore                 
├── package.json               
├── package-lock.json          
└── tsconfig.json              
```

## Getting Started

To set up and run this Playwright test project, follow these steps:

**Install Dependencies:**

   Ensure you have Node.js installed, then run the following command in the project root directory to install all necessary dependencies:

   ```bash
   npm install
   ```
   

## Run Tests

To execute the test suite, run:

```bash
npm run test --tags="not @skip"
```
or
```bash
yarn test
```  

## Writing Tests

- **Feature Files:** Located in `src/test/features/`, these files contain the Gherkin syntax for describing test scenarios. For example, `coins.feature` describes tests related to coin transactions.

- **Step Definitions:** Implementations of the Gherkin steps are in `src/test/steps/`. For example, `coins.steps.ts` contains the logic to execute the steps defined in the `coins.feature` file.

- **Page Objects:** The `src/pages/` directory contains classes implementing the Page Object Model pattern, encapsulating interactions with the web application's UI components.

## Test Reports

After running tests, results are stored in the `test-results/` directory:

- **HTML Report:** `cucumber-report.html` provides a detailed view of test outcomes with structured information.
- **JSON Report:** `cucumber-report.json` is a machine-readable format for integration with CI tools.

## Notes
- Node version v18.20.4 
- NPM 10.7.0

### Bugs Found
- Negative number can be used when selling a coin and mimics a buy