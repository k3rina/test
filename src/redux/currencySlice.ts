// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import * as api from '../App/api';
// import { CurrencyState } from '@components/types/State';

// const initialState: CurrencyState = {
//   currency: {
//     query: { from: '', to: '', amount: '' },
//     result: 0,
//     exchange: { rates: {}, base: '' },
//   },
//   error: undefined,
// };

// export const loadCurrency = createAsyncThunk(
//   'currency/load',
//   async ({
//     toAmount,
//     fromAmount,
//     amount,
//   }: {
//     toAmount: string;
//     fromAmount: string;
//     amount: string;
//   }) => {
//     const data = await api.convertCurrencyFetch(
//       toAmount, // Corrected parameter names
//       fromAmount, // Corrected parameter names
//       amount
//     );
//     return data;
//   }
// );

// export const exchangeCurrency = createAsyncThunk('currency/exchange', () =>
//   api.exchangeRateFetch()
// );

// const currencySlice = createSlice({
//   name: 'currency',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadCurrency.fulfilled, (state, action) => {
//         state.currency.result = action.payload.result;
//       })
//       .addCase(loadCurrency.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       .addCase(exchangeCurrency.fulfilled, (state, action) => {
//         state.currency = action.payload;
//       })

//       .addCase(exchangeCurrency.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export default currencySlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../App/api';
import { CurrencyState } from '@components/types/State';

const initialState: CurrencyState = {
  currency: {
    query: { from: '', to: '', amount: '' },
    result: 0,
    exchange: { rates: {}, base: '' },
    error: undefined,
    fromCurrency: '',
    toCurrency: '',
  },
  // Move the error property here
};

export const loadCurrency = createAsyncThunk(
  'currency/load',
  async ({
    toAmount,
    fromAmount,
    amount,
  }: {
    toAmount: string;
    fromAmount: string;
    amount: string;
  }) => {
    const data = await api.convertCurrencyFetch(toAmount, fromAmount, amount);
    return data;
  }
);

export const exchangeCurrency = createAsyncThunk('currency/exchange', () =>
  api.exchangeRateFetch()
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateFromCurrency: (state, action: PayloadAction<string>) => {
      state.currency.fromCurrency = action.payload;
    },
    updateToCurrency: (state, action: PayloadAction<string>) => {
      state.currency.toCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrency.fulfilled, (state, action) => {
        state.currency.result = action.payload.result;
      })
      .addCase(loadCurrency.rejected, (state, action) => {
        state.currency.error = action.error.message;
      })
      .addCase(exchangeCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      });
  },
});
export const { updateFromCurrency, updateToCurrency } = currencySlice.actions;
export default currencySlice.reducer;
