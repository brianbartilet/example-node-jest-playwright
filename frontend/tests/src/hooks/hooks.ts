import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

//#region Quick Utilities
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function extractNumberBetweenDelimiters(
  str: string,
  startDelimiter: string,
  endDelimiter: string
): number {
  const startIndex = str.indexOf(startDelimiter);
  const endIndex = str.indexOf(endDelimiter, startIndex + startDelimiter.length);

  // Check if delimiters are found in the string
  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Delimiters not found in the string');
  }

  // Extract the substring between the delimiters
  const extractedText = str.substring(startIndex + startDelimiter.length, endIndex).trim();

  // Convert the extracted text to a number
  const number = parseFloat(extractedText);

  // Check if conversion to number was successful
  if (isNaN(number)) {
    throw new Error('Extracted text is not a valid number');
  }

  return number;
}

//#endregion

interface CustomWorld {
  browser: Browser;
  page: Page;
}

export class Fixture implements CustomWorld {
  browser: Browser;
  page: Page;
  contextData: { [key: string]: any }; // Add a object for storing key-value pairs

  constructor() {
    this.browser = null!;
    this.page = null!;
    this.contextData = {}
  }
}

setWorldConstructor(Fixture);

Before({ timeout: 20000 }, async function (this: Fixture) {
  console.log('Before hook: initializing browser and page');
  
  try {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    // Use environment variable for URL, default to 'http://localhost:5173' if not set
    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    await this.page.goto(appUrl);
    
    console.log(`Page loaded with URL: ${appUrl}`);
    // Wait for the root element to ensure the app is loaded
    await this.page.waitForSelector('#root', { state: 'attached' });
    console.log('Browser and page initialized');
  } catch (error) {
    console.error('Error during browser initialization:', error);
    throw error;
  }
});

After({ timeout: 20000 }, async function (this: Fixture) {
  
  try {
    if (this.page) {
      await this.page.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
    console.log('Browser and page closed');
  } catch (error) {
    console.error('Error during browser closure:', error);
    throw error;
  }

});


