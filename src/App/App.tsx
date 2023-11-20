import { exchangeCurrency } from '../redux/currencySlice';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { loadCurrency } from '../redux/currencySlice';

import '../styles/App.css';

import arrows from '../assets/arrows.svg';
import Currencymain from '../components/Currencymain';
import { validateAmount } from '@components/utils';
import Currencyinput from '@components/Currencyinput';

function App() {
  const { error, result } = useAppSelector((store) => store.currency.currency);

  const setIsAmountValidRef = (isValid: boolean) => {
    setIsAmountValid(isValid);
  };
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [amount, setAmount] = useState<string>('1000.32');
  const [rotateArrows, setRotateArrows] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<string | null>(null);

  const { rates, base } = useAppSelector(
    (store) => store.currency?.currency?.exchange
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstCurrency = Object.keys(rates)[149];
    dispatch(exchangeCurrency());
    setFromCurrency(base);
    setToCurrency(firstCurrency);
  }, [base]);

  useEffect(() => {
    if (base != null) {
      const uniqueKeys = Array.from(
        new Set([base, ...(Object.keys(rates) as string[])])
      );
      const filteredUniqueKeys = [
        base,
        ...uniqueKeys.filter((currency) => currency !== base),
      ];
      setCurrencyOptions(filteredUniqueKeys);
    }
  }, [rates]);

  const debouncedFetchData = debounce(
    async (fromCurrency: string, toCurrency: string, amount: string) => {
      try {
        setIsLoading(true);

        if (!currencyOptions.includes(fromCurrency) || !fromCurrency) {
          console.error(`Invalid fromCurrency: ${fromCurrency}`);
          return;
        }

        if (!fromCurrency || !toCurrency) {
          console.error('Invalid fromCurrency, toCurrency, or amount.');
          console.log('fromCurrency:', fromCurrency);
          console.log('toCurrency:', toCurrency);
          return;
        }
        const isValid = validateAmount(amount);
        setIsAmountValid(isValid);

        if (!isValid) {
          console.error(
            'Amount is not valid. Proceeding with the API request.'
          );
        }
        if (toCurrency && amount) {
          const resultAction = await dispatch(
            loadCurrency({
              toAmount: toCurrency,
              fromAmount: fromCurrency,
              amount,
            })
          );
        }
      } catch (error) {
        console.error('API request failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    1000
  );

  useEffect(() => {
    const updateExchangeRate = async () => {
      debouncedFetchData(fromCurrency, toCurrency, amount);
      const newExchangeRate = await calculateExchangeRate(
        fromCurrency,
        toCurrency,
        amount,
        result
      );
      setExchangeRate(newExchangeRate);
    };

    updateExchangeRate();
  }, [fromCurrency, toCurrency, amount, result]);

  function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newAmount = e.target.value;
    setAmount(newAmount === '' ? '' : newAmount);
    console.log('From Currency:', fromCurrency);
    error == undefined &&
      debouncedFetchData(fromCurrency, toCurrency, newAmount);
  }

  useEffect(() => {
    const isValid = validateAmount(amount || '');
    setIsAmountValid(isValid);
  }, [amount, rates]);

  function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newAmount = e.target.value;
    setAmount(newAmount === '' ? '' : newAmount);
    error == undefined &&
      debouncedFetchData(fromCurrency, toCurrency, newAmount);
  }

  const handleArrowsClick = () => {
    setRotateArrows(!rotateArrows);

    const tempFromCurrency = fromCurrency;
    const tempToCurrency = toCurrency;

    setFromCurrency(tempToCurrency);
    setToCurrency(tempFromCurrency);

    setCurrencyOptions([tempFromCurrency, tempToCurrency]);
  };

  useEffect(() => {
    const calculateRate = async () => {
      const newExchangeRate = await calculateExchangeRate(
        fromCurrency,
        toCurrency,
        amount,
        result
      );

      setExchangeRate(newExchangeRate);
    };

    calculateRate();
  }, [toCurrency, fromCurrency, amount, result]);

  async function calculateExchangeRate(
    from: string = 'USD',
    to: string = 'EUR',
    am: string = '1000.32',
    res: number
  ) {
    try {
      const resultValue = result;

      if (
        !from ||
        !to ||
        !am ||
        res === undefined ||
        resultValue === undefined
      ) {
        console.error('Invalid input. Cannot calculate exchange rate.');
        return null;
      }

      const exchangeRate = res / parseFloat(am);

      return exchangeRate.toFixed(4);
    } catch (error) {
      console.error('Error while waiting for result:', error);
      return null;
    }
  }

  return (
    <div className="app">
      <div className="header">Currency Converter</div>
      <div className="subheader">
        Check live rates, set rate alerts, receive notifications and more.
      </div>
      <div
        className={`card ${
          !isAmountValid || amount == undefined ? '' : 'card_error'
        }`}
      >
        <div className="first_block">
          <div className="amount"> Amount</div>
          <Currencyinput
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            amount={amount}
            setFromCurrency={setFromCurrency}
            onChangeAmount={handleFromAmountChange}
            setIsAmountValidRef={setIsAmountValidRef}
            fromCurrency={fromCurrency}
          />
        </div>

        <div className="line_border">
          <div className="line"></div>
          <div className="circle-container">
            <div
              className={`circle ${rotateArrows ? 'rotate' : ''}`}
              onClick={handleArrowsClick}
            >
              {' '}
              <img src={arrows} alt="button" />
            </div>
          </div>
        </div>
        <div className="first_block">
          <div className="amount convert">Converted Amount</div>
          <Currencymain
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            setToCurrency={setToCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            isLoading={isLoading}
            onChangeAmount={handleToAmountChange}
            setIsAmountValidRef={setIsAmountValidRef}
            toCurrency={toCurrency}
          />
        </div>
      </div>{' '}
      <div className="exchange">Indicative Exchange Rate</div>
      <div className="rate">
        {` 1 ${fromCurrency} = ${
          exchangeRate == null ? 0 : exchangeRate
        } ${toCurrency} `}
      </div>
    </div>
  );
}

export default App;
