import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Fixture } from '../../hooks/hooks';
import { PagePortfolio, extractNumberFromBalanceString } from '../../pages/portfolio';


Given('I have available balance in my account', async function (this: Fixture) {

  const pagePortfolio = new PagePortfolio(this.page);
  const headerText = await pagePortfolio.textHeader.textContent();
  expect(headerText).toContain('Balance: $1000')

  this.contextData.initialBalance = 1000

});

Given('I have available {string} in my portfolio', async function (this: Fixture, coin: string) {
  const pagePortfolio = new PagePortfolio(this.page);
  await pagePortfolio.setCoinCount(coin, 1)
  await pagePortfolio.buyCoin(coin)
});

When('I buy a {string}', async function (this: Fixture, coin: string) {
  const pagePortfolio = new PagePortfolio(this.page);
  await pagePortfolio.setCoinCount(coin, 1)
  await pagePortfolio.buyCoin(coin)

  this.contextData.coin = coin
  this.contextData.action = 'buy'
});


When('I sell a {string}', async function (this: Fixture, coin: string) {
  const pagePortfolio = new PagePortfolio(this.page);
  await pagePortfolio.sellCoin(coin)

  this.contextData.coin = coin
  this.contextData.action = 'sell'
});

Then('my portfolio is updated', async function (this: Fixture) {
  const pagePortfolio = new PagePortfolio(this.page);
  const portfolioItem = await pagePortfolio.getPortfolioItemLocator(this.contextData.coin ).textContent();
  
  console.log(`Checking account balance from ${this.contextData.action}`)

  if (this.contextData.action === 'buy') {
    expect(portfolioItem).toContain('1');
  }
  if (this.contextData.action === 'buy') {
    expect(portfolioItem).toContain('0');
  }
  
});

Then('my account balance is updated', async function (this: Fixture) {
  const pagePortfolio = new PagePortfolio(this.page);
  const textBalance = await pagePortfolio.textBalance.textContent();
  const balance = extractNumberFromBalanceString(textBalance)

  console.log(`Checking account balance from ${this.contextData.action}`)
  if (this.contextData.action === 'buy'){
    expect(balance).toBeLessThan(this.contextData.initialBalance)
  }
  else {
    expect(balance).not.toEqual(this.contextData.initialBalance)
  }
  
});
