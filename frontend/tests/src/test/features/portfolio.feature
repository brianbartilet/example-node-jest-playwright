Feature: View Portfolio
  User can view his portfolio and account balance

@skip
Scenario: User starts with initial balance
    Given I am a new user 
    When I view my account balance
    Then my account balance is exactly $1000

@skip
Scenario: User views current portfolio and balance
    Given I am new user
    When I view my portfolio
    Then I see a list of coins I own
    And I see my current account balance

@skip
Scenario: Coin prices are updated regularly
    Given the application is running
    When a price update occurs
    Then I can view the updates to the coin prices

@skip
Scenario Outline: Coin price changes based on type
    Given the current price of <coin>
    When the price is updated
    Then the price changes according to the <behavior>
Examples:
    | coin  | behavior                                                  |
    | CoinA | increments randomly between -5 and +5                     |
    | CoinB | increases by 1                                            |
    | CoinC | increases by 10 until it reaches 200, then resets to 100  |
    | CoinD | doubles if even owned, halves if odd owned                |
