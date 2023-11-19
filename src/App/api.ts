import { Currency } from '@components/types/State';

const createHeaders = () => {
  const myHeaders = new Headers();
  const apikey = import.meta.env.VITE_API_KEY;
  myHeaders.append('apikey', apikey);
  return myHeaders;
};

const createRequestOptions = (method: string): RequestInit => {
  return {
    method,
    redirect: 'follow',
    headers: createHeaders(),
  };
};

export const convertCurrencyFetch = async (
  toAmount: string,
  fromCurrency: string,
  amount: string
): Promise<Currency> => {
  const requestOptions: RequestInit = createRequestOptions('GET');

  try {
    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${toAmount}&from=${fromCurrency}&amount=${amount}`,
      requestOptions
    );
    const data = await res.json();
    if (!res.ok) {
      console.error('API request failed with status:', res.status);
      console.error('API Error:', data);
      throw new Error('API request failed');
    }

    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error during API request:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const exchangeRateFetch = async (): Promise<Currency> => {
  const requestOptions: RequestInit = createRequestOptions('GET');

  const res = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest',
    requestOptions
  );

  const jsonData = await res.json();

  // Ensure the response structure matches your Currency type
  const currencyResponse: Currency = {
    query: { from: '', to: '', amount: '' },
    result: 0,
    exchange: {
      rates: jsonData.rates,
      base: jsonData.base,
    },
    error: undefined,
  };

  return currencyResponse;
};
