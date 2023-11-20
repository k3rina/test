export type Query = {
  from: string;
  to: string;
  amount: string;
};

export type Currency = {
  query: Query;
  result: number;
  exchange: { rates: Record<string, number>; base: string };
  error: string | undefined;
  fromCurrency: string;
  toCurrency: string;
};

export type CurrencyState = {
  currency: Currency;
};
