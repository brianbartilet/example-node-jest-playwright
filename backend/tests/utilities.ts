export interface TestCase {
    description: string;
    given: {
      parameters: {
        coinId: any; // Can be string, number, or null
        amount: number;
      };
    };
    then: {
      response_code: number;
    };
    toString: () => string;
  }