import { Page, Locator } from '@playwright/test';

export function extractNumberFromBalanceString(str: string): number {
    const startDelimiter = '$';
    
    // Find the position of the dollar sign
    const startIndex = str.indexOf(startDelimiter);
    
    // Ensure the delimiter is found
    if (startIndex === -1) {
      throw new Error('Start delimiter not found in the string');
    }
  
    // Extract the substring from the start delimiter to the end of the string
    const extractedText = str.substring(startIndex + startDelimiter.length).trim();
  
    // Convert the extracted text to a number
    const number = parseFloat(extractedText);
  
    // Check if conversion to number was successful
    if (isNaN(number)) {
      throw new Error('Extracted text is not a valid number');
    }
  
    return number;
  }

export class PagePortfolio {
    readonly page: Page;
    readonly textHeader: Locator
    readonly textBalance: Locator;
    readonly buttonBuy: Locator;
    readonly buttonSell: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textHeader = page.locator("//header")
        this.textBalance = page.locator("//div[@class='inventory']//div[contains(.,'USD Balance')]");
        this.buttonBuy = null;
        this.buttonSell = null;
    }

    getAmountInputLocator(coin: string): Locator {
        return this.page.locator(`//div[@class='ticket bordered' and contains(.,'${coin}')]//input`);
    }

    getBuyButtonLocator(coin: string): Locator {
        return this.page.locator(`//div[@class='ticket bordered' and contains(.,'${coin}')]//button[text()='Buy']`);
    }

    getSellButtonLocator(coin: string): Locator {
        return this.page.locator(`//div[@class='ticket bordered' and contains(.,'${coin}')]//button[text()='Sell']`);
    }

    getPortfolioItemLocator(coin: string): Locator {
        return this.page.locator(`//div[@class='inventory-item' and contains(.,'${coin}')]`)
    }

    async setCoinCount(coin: string, count: number) {
        const inputLocator = this.getAmountInputLocator(coin);
        await inputLocator.fill(count.toString());
    }
    
    async buyCoin(coin: string) {
        const buyButtonLocator = this.getBuyButtonLocator(coin);
        await buyButtonLocator.click();
    }
    
    async sellCoin(coin: string) {
        const sellButtonLocator = this.getSellButtonLocator(coin);
        await sellButtonLocator.click();
    }
    


    
}

