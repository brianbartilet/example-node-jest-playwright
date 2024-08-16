Feature: User can buy or sell coins

Scenario Outline: User can buy coins with available balance
    Given I have available balance in my account
    When I buy a '<coin>'
    Then my portfolio is updated
    And my account balance is updated
Examples:
    | coin  | 
    | CoinA |
    | CoinB |
    | CoinC | 
    | CoinD |

Scenario Outline: User can sell coins available in portfolio
    Given I have available '<coin>' in my portfolio
    When I sell a '<coin>'
    Then my portfolio is updated
    And my account balance is updated
Examples:
    | coin  | 
    | CoinA |
    | CoinB |
    | CoinC | 
    | CoinD |

@skip
Scenario: User cannot buy coins without sufficient balance
    Given I have insufficient balance in my account
    When I try to buy any coin
    Then I receive an error message
    And my portfolio is not updated
    And my account balance is not updated

@skip
Scenario: User cannot sell coins not in portfolio
    Given I have no coins in my portfolio
    When I try to sell any coin
    Then I receive an error message
    And my portfolio is not updated
    And my account balance is not updated

@skip
Scenario: User can partially sell coins
    Given I have available coins in my portfolio
    When I sell a portion any coin
    Then my portfolio is updated
    And my account balance is updated


