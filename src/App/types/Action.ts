import { Currency } from '@components/types/State';

export type Action =
  | { type: 'currency/load'; payload: Currency }
  | { type: 'currency/exchange'; payload: Currency };
