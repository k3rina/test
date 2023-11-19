// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import debounce from 'lodash/debounce';

// import { useAppDispatch, useAppSelector } from '../redux/store';
import { exchangeCurrency } from '../redux/currencySlice';

// import '../styles/App.css';

// import arrows from '../assets/arrows.svg';
// import Currencymain from '../components/Currencymain';
// import { validateAmount } from '@components/utils';

// function App() {
//   const { error, result, exchange } = useAppSelector(
//     (store) => store.currency.currency
//   );

//   const setIsAmountValidRef = (isValid: boolean) => {
//     setIsAmountValid(isValid);
//   };
//   const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
//   const [isAmountValid, setIsAmountValid] = useState(true);

//   const [fromCurrency, setFromCurrency] = useState<string>('');
//   const [toCurrency, setToCurrency] = useState<string>('');
//   const [amount, setAmount] = useState<string>('1000.32');
//   const [rotateArrows, setRotateArrows] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [exchangeRate, setExchangeRate] = useState<number | null>(null);

//   const { rates, base } = useAppSelector(
//     (store) => store.currency?.currency?.exchange
//   );
//   const dispatch = useAppDispatch();
//   console.log(rates[toCurrency], 'curen', toCurrency, fromCurrency);

//   useEffect(() => {
//     const firstCurrency = Object.keys(rates)[149];
//     dispatch(exchangeCurrency());
//     setFromCurrency(base);
//     setToCurrency(firstCurrency);
//   }, [base]);

//   useEffect(() => {
//     if (base != null) {
//       const uniqueKeys = Array.from(
//         new Set([base, ...(Object.keys(rates) as string[])])
//       );
//       const filteredUniqueKeys = [
//         base,
//         ...uniqueKeys.filter((currency) => currency !== base),
//       ];
//       setCurrencyOptions(filteredUniqueKeys);
//     }
//   }, [rates]);

//   const debouncedFetchData = debounce(
//     async (fromCurrency: string, toCurrency: string, amount: string) => {
//       try {
//         setIsLoading(true);

//         // Move the check for fromCurrency here
//         if (!currencyOptions.includes(fromCurrency) || !fromCurrency) {
//           console.error(`Invalid fromCurrency: ${fromCurrency}`);
//           return;
//         }
//         console.log('fromCurrency:', fromCurrency);
//         console.log('currencyOptions:', currencyOptions);

//         if (!fromCurrency || !toCurrency || !amount) {
//           console.error('Invalid fromCurrency, toCurrency, or amount.');
//           console.log('fromCurrency:', fromCurrency);
//           console.log('toCurrency:', toCurrency);
//           console.log('amount:', amount);
//           return;
//         }
//         const isValid = validateAmount(amount || '');
//         setIsAmountValid(isValid);

//         if (!isValid) {
//           console.error(
//             'Amount is not valid. Proceeding with the API request.'
//           );
//         }
//         if (fromCurrency && toCurrency && amount) {
//           const resultAction = await dispatch(
//             loadCurrency({
//               toAmount: toCurrency,
//               fromAmount: fromCurrency,
//               amount,
//             })
//           );
//         }
//         // Validate amount here and set isAmountValid
//       } catch (error) {
//         console.error('API request failed:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     1000
//   );

//   useEffect(() => {
//     dispatch(exchangeCurrency());
//     console.log(fromCurrency, 'from1');
//     console.log(toCurrency, 'to1');
//   }, [fromCurrency, toCurrency]);
//   useEffect(() => {
//     debouncedFetchData(fromCurrency, toCurrency, amount);
//   }, [fromCurrency, toCurrency, amount, dispatch]);

//   function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const newAmount = e.target.value;
//     setAmount(newAmount === '' ? '' : newAmount);
//     console.log('From Currency:', fromCurrency);
//     error == undefined &&
//       debouncedFetchData(fromCurrency, toCurrency, newAmount);
//   }
//   useEffect(() => {
//     // Skip validation when the component mounts and amount is the initial value

//     const isValid = validateAmount(amount || '');
//     setIsAmountValid(isValid);
//   }, [amount, rates]);

//   function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const newAmount = e.target.value;
//     setAmount(newAmount === '' ? '' : newAmount);

//     error == undefined &&
//       debouncedFetchData(fromCurrency, toCurrency, newAmount);
//   }

//   console.log('rates:', rates);
//   console.log('rates:', rates);

//   const handleArrowsClick = () => {
//     setRotateArrows(!rotateArrows);

//     const tempFromCurrency = fromCurrency;
//     const tempToCurrency = toCurrency;

//     console.log(
//       'Before swap - fromCurrency:',
//       tempFromCurrency,
//       'toCurrency:',
//       tempToCurrency
//     );

//     setFromCurrency(tempToCurrency);
//     setToCurrency(tempFromCurrency);
//     console.log(toCurrency, fromCurrency, 'after');

//     const newExchangeRate = calculateExchangeRate(
//       fromCurrency,
//       toCurrency,
//       amount,
//       result
//     );
//     setExchangeRate(newExchangeRate);
//   };

//   function calculateExchangeRate(
//     from: string = 'USD',
//     to: string = 'EUR',
//     am: string,
//     res: number
//   ) {
//     if (!from || !to || !am || res === undefined) {
//       console.error('Invalid input. Cannot calculate exchange rate.');
//       return null;
//     }

//     const exchangeRate = result / parseFloat(amount);

//     console.log(
//       `Indicative Exchange Rate: 1 ${fromCurrency} = ${exchangeRate.toFixed(
//         4
//       )} ${toCurrency}`
//     );

//     return exchangeRate;
//   }

//   // const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value;

//   //   // Validate the amount
//   //   const isValid = validateAmount(value);

//   //   // Update the amount state only if it's a valid value
//   //   if (isValid) {
//   //     setAmount(value);
//   //   }
//   // };

//   return (
//     <div className="app">
//       <div className="header">Currency Converter</div>
//       <div className="subheader">
//         Check live rates, set rate alerts, receive notifications and more.
//       </div>
//       <div className="card">
//         <div className="first_block">
//           <div className="amount"> Amount</div>
//           <Currencymain
//             currencyOptions={currencyOptions}
//             selectedCurrency={fromCurrency}
//             onChangeCurrency={(e) => setFromCurrency(e.target.value)}
//             amount={amount}
//             setCurrency={setFromCurrency}
//             isLoading={isLoading}
//             onChangeAmount={handleFromAmountChange}
//             setIsAmountValidRef={setIsAmountValidRef}
//           />
//         </div>
//         <div className="line_border">
//           <div className="line"></div>
//           <div className="circle-container">
//             <div
//               className={`circle ${rotateArrows ? 'rotate' : ''}`}
//               onClick={handleArrowsClick}
//             >
//               {' '}
//               <img src={arrows} alt="button" />
//             </div>
//           </div>
//         </div>
//         <div className="first_block">
//           <div className="amount convert">Converted Amount</div>
//           <Currencymain
//             currencyOptions={currencyOptions}
//             selectedCurrency={toCurrency}
//             setCurrency={setToCurrency}
//             onChangeCurrency={(e) => setToCurrency(e.target.value)}
//             isLoading={isLoading}
//             onChangeAmount={handleToAmountChange}
//             setIsAmountValidRef={setIsAmountValidRef}
//           />
//         </div>
//       </div>{' '}
//       <div className="exchange">Indicative Exchange Rate</div>
//       <div className="rate">
//         {` 1 ${fromCurrency} = ${exchange?.rates[toCurrency]?.toFixed(
//           4
//         )} ${toCurrency} `}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { loadCurrency } from '../redux/currencySlice';

import '../styles/App.css';

import arrows from '../assets/arrows.svg';
import Currencymain from '../components/Currencymain';
import { validateAmount } from '@components/utils';

function App() {
  const { error, result } = useAppSelector((store) => store.currency.currency);

  const setIsAmountValidRef = (isValid: boolean) => {
    setIsAmountValid(isValid);
  };
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [isAmountValid, setIsAmountValid] = useState(true);

  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [amount, setAmount] = useState<string>('1000.32');
  const [rotateArrows, setRotateArrows] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<string | null>(null);

  const { rates, base } = useAppSelector(
    (store) => store.currency?.currency?.exchange
  );
  const dispatch = useAppDispatch();
  console.log(rates[toCurrency], 'curen', toCurrency, fromCurrency);

  useEffect(() => {
    const firstCurrency = Object.keys(rates)[149];
    dispatch(exchangeCurrency());
    setFromCurrency(base);
    setToCurrency(firstCurrency);

    // Define an async function to handle the Promise
    const updateExchangeRate = async () => {
      const newExchange = await calculateExchangeRate(
        fromCurrency,
        toCurrency,
        amount,
        result
      );
      setExchangeRate(newExchange);
    };

    // Call the async function
    updateExchangeRate();
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

        // Move the check for fromCurrency here
        if (!currencyOptions.includes(fromCurrency) || !fromCurrency) {
          console.error(`Invalid fromCurrency: ${fromCurrency}`);
          return;
        }
        console.log('fromCurrency:', fromCurrency);
        console.log('currencyOptions:', currencyOptions);

        if (!fromCurrency || !toCurrency || !amount) {
          console.error('Invalid fromCurrency, toCurrency, or amount.');
          console.log('fromCurrency:', fromCurrency);
          console.log('toCurrency:', toCurrency);
          console.log('amount:', amount);
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
        // Validate amount here and set isAmountValid
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
    // Skip validation when the component mounts and amount is the initial value

    const isValid = validateAmount(amount || '');
    setIsAmountValid(isValid);
  }, [amount, rates]);

  function handleToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newAmount = e.target.value;
    setAmount(newAmount === '' ? '' : newAmount);

    error == undefined &&
      debouncedFetchData(fromCurrency, toCurrency, newAmount);
  }

  const handleArrowsClick = async () => {
    setRotateArrows(!rotateArrows);

    const tempFromCurrency = fromCurrency;
    const tempToCurrency = toCurrency;

    console.log(
      'Before swap - fromCurrency:',
      tempFromCurrency,
      'toCurrency:',
      tempToCurrency
    );

    setFromCurrency(tempToCurrency);
    setToCurrency(tempFromCurrency);
    console.log(toCurrency, fromCurrency, 'after');

    const newExchangeRate = await calculateExchangeRate(
      tempFromCurrency, // use the updated fromCurrency
      tempToCurrency, // use the updated toCurrency
      amount,
      result
    );

    setExchangeRate(newExchangeRate);
  };

  async function calculateExchangeRate(
    from: string = 'USD',
    to: string = 'EUR',
    am: string = '1000.32',
    res: number
  ) {
    try {
      const resultValue = await result;

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

      console.log(
        `Indicative Exchange Rate: 1 ${from} = ${exchangeRate.toFixed(4)} ${to}`
      );

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
      <div className="card">
        <div className="first_block">
          <div className="amount"> Amount</div>
          <Currencymain
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            amount={amount}
            setCurrency={setFromCurrency}
            isLoading={isLoading}
            onChangeAmount={handleFromAmountChange}
            setIsAmountValidRef={setIsAmountValidRef}
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
            setCurrency={setToCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            isLoading={isLoading}
            onChangeAmount={handleToAmountChange}
            setIsAmountValidRef={setIsAmountValidRef}
          />
        </div>
      </div>{' '}
      <div className="exchange">Indicative Exchange Rate</div>
      <div className="rate">
        {` 1 ${fromCurrency} = ${exchangeRate} ${toCurrency} `}
      </div>
    </div>
  );
}

export default App;
