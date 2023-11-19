// // import { useRef } from 'react';
// // import { useAppSelector } from '../redux/store';
// // import '../styles/App.css';
// import CurrencyFlag from 'react-currency-flags';
// import { useEffect, useRef, useState } from 'react';
// import { useAppSelector } from '../redux/store';
// import '../styles/App.css';

// import { validateAmount } from './utils';
// interface CurrencymainProps {
//   currencyOptions: string[];
//   selectedCurrency: string;

//   onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   exchangeRate?: number;
//   isLoading?: boolean;
//   setIsAmountValidRef: (isValid: boolean) => void;
//   amount?: string;
// }

// interface CurrencyFlagComponentProps {
//   code: string;
// }

// const CurrencyFlagComponent1: React.FC<CurrencyFlagComponentProps> = ({
//   code,
// }) => <CurrencyFlag currency={code} size="md" />;

// const Currencymain = ({
//   currencyOptions,
//   selectedCurrency,
//   isLoading,
//   onChangeCurrency,
//   onChangeAmount,
//   amount,
// }: CurrencymainProps): JSX.Element => {
//   const { result } = useAppSelector((store) => store.currency.currency);
//   const [isAmountNotValid, setNotAmountValid] = useState(true);

//   const setIsAmountValidRef = useRef<(isValid: boolean) => void>(() => {});

//   useEffect(() => {
//     // Validate the amount
//     console.log('Current amount:', amount);
//     const isValid = validateAmount(amount || '');
//     console.log('Is amount valid?', isValid);
//     // Set the state based on the validation result
//     setNotAmountValid(isValid);

//     // Update the external reference with the validation result
//     setIsAmountValidRef.current(isValid);
//   }, [amount, setNotAmountValid, setIsAmountValidRef]);

//   const shouldDisplayError = amount !== undefined;

//   const displayValue =
//     isLoading || !isAmountNotValid ? '' : result?.toFixed(2) || '';

//   console.log('Display Value:', displayValue);

//   return (
//     <div className={`input-main ${shouldDisplayError ? 'error' : ''}`}>
//       {' '}
//       {isAmountNotValid && amount !== undefined && (
//         <div className="error-message">Amount not valid</div>
//       )}
//       <div className="main">
//         <select value={selectedCurrency} onChange={onChangeCurrency}>
//           {currencyOptions.map((currency: string) => (
//             <option key={currency} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select>

//         {amount !== undefined ? (
//           <>
//             <input
//               type="text"
//               className={`input  ${
//                 isAmountNotValid || amount == '' ? 'error-boundary' : ''
//               }`}
//               value={amount}
//               onChange={onChangeAmount}
//             />
//           </>
//         ) : (
//           <>
//             {isLoading && (
//               <div>
//                 <div className="loader"></div>
//               </div>
//             )}
//             <input
//               type="text"
//               className={`input ${isLoading ? 'loading' : ''} ${
//                 shouldDisplayError ? 'error-border' : ''
//               }`}
//               value={displayValue}
//               disabled
//               onChange={onChangeAmount}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Currencymain;

// import CurrencyFlag from 'react-currency-flags';
// import { useEffect, useRef, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../redux/store';
// import '../styles/App.css';
// import down from '../assets/down.svg';

// import { validateAmount } from './utils';
// import { loadCurrency } from '../redux/currencySlice';
interface CurrencymainProps {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exchangeRate?: number;
  isLoading?: boolean;
  setIsAmountValidRef: (isValid: boolean) => void;
  amount?: string;
  setCurrency: (currency: string) => void;
}

// interface CurrencyFlagComponentProps {
//   code: string;
// }

// const CurrencyFlagComponent1: React.FC<CurrencyFlagComponentProps> = ({
//   code,
// }) => <CurrencyFlag currency={code} size="md" />;

// const Currencymain = ({
//   currencyOptions,
//   selectedCurrency,
//   isLoading,
//   onChangeCurrency,
//   onChangeAmount,
//   amount,
// }: CurrencymainProps): JSX.Element => {
//   const { result } = useAppSelector((store) => store.currency.currency);
//   const [isAmountNotValid, setNotAmountValid] = useState(true);
//   const [isActive, setIsActive] = useState(false);
//   const setIsAmountValidRef = useRef<(isValid: boolean) => void>(() => {});
//   const selectedOptionRef = useRef<string | null>(null);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     // Validate the amount
//     console.log('Current amount:', amount);
//     const isValid = validateAmount(amount || '');
//     console.log('Is amount valid?', isValid);
//     // Set the state based on the validation result
//     setNotAmountValid(isValid);

//     // Update the external reference with the validation result
//     setIsAmountValidRef.current(isValid);
//   }, [amount, setNotAmountValid, setIsAmountValidRef]);

//   const shouldDisplayError = amount !== undefined;

//   const displayValue =
//     isLoading || !isAmountNotValid ? '' : result?.toFixed(2) || '';

//   console.log('Display Value:', displayValue);
//   useEffect(() => {
//     // Validate the amount
//     console.log('Current amount:', amount);
//     const isValid = validateAmount(amount || '');
//     console.log('Is amount valid?', isValid);
//     // Set the state based on the validation result
//     setNotAmountValid(isValid);

//     // Update the external reference with the validation result
//     setIsAmountValidRef.current(isValid);

//     // Add dependencies
//   }, [amount, setNotAmountValid, setIsAmountValidRef, setCurrency]);

//   return (
//     <div className={`input-main ${shouldDisplayError ? 'error' : ''}`}>
//       {' '}
//       {isAmountNotValid && amount !== undefined && (
//         <div className="error-message">Amount not valid</div>
//       )}
//       <div className="main">
//         {/* <select value={selectedCurrency} onChange={onChangeCurrency}>
//           {currencyOptions.map((currency: string) => (
//             <option key={currency} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select> */}

//         <div className="dropdown" style={{ minWidth: '100px' }}>
//           <div
//             className={`dropdown-btn ${!isActive ? 'active' : ''}`}
//             onClick={(e) => setIsActive(!isActive)}
//           >
//             {currency || selectedCurrency}
//             <img
//               src={down}
//               className="w-[10px] h-[6px] cursor-pointer"
//               alt="down"
//             />
//           </div>
//           {isActive && (
//             <div className="dropdown-content min-w-[200px]">
//               <div>{currency || currencyOptions[0]}</div>
//               {currencyOptions.slice(1).map((option) => (
//                 <div className=" p-[7px] cursor-pointer hover:text-[#122945] relative">
//                   {' '}
//                   <div
//                     key={option}
//                     onClick={(e) => {
//                       setCurrency(option);

//                       setIsActive(false);
//                       selectedOptionRef.current = option;
//                     }}
//                     className={` ${
//                       selectedOptionRef.current === option ? 'dot' : ''
//                     }`}
//                     style={{
//                       padding: '10px',
//                       cursor: 'pointer',
//                       transition: 'all 0.2s',
//                     }}
//                   >
//                     {option}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {amount !== undefined ? (
//           <>
//             <input
//               type="text"
//               className={`input  ${
//                 isAmountNotValid || amount == '' ? 'error-boundary' : ''
//               }`}
//               value={amount}
//               onChange={onChangeAmount}
//             />
//           </>
//         ) : (
//           <>
//             {isLoading && (
//               <div>
//                 <div className="loader"></div>
//               </div>
//             )}
//             <input
//               type="text"
//               className={`input ${isLoading ? 'loading' : ''} ${
//                 shouldDisplayError ? 'error-border' : ''
//               }`}
//               value={displayValue}
//               disabled
//               onChange={onChangeAmount}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Currencymain;

import CurrencyFlag from 'react-currency-flags';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import '../styles/App.css';
import down from '../assets/down.svg';

import { validateAmount } from './utils';
import { exchangeCurrency } from '../redux/currencySlice';

interface CurrencyFlagComponentProps {
  currency: string;
}

const CurrencyFlagComponent1: React.FC<CurrencyFlagComponentProps> = ({
  currency,
}) => {
  if (!currency) {
    // You can choose to render a default flag or handle it based on your needs
    return <div>No currency provided</div>;
  }

  return (
    <CurrencyFlag currency={currency} width={45} height={45} className="flag" />
  );
};

const Currencymain = ({
  currencyOptions,
  selectedCurrency,
  isLoading,
  onChangeCurrency,
  onChangeAmount,
  amount,

  setCurrency,
}: CurrencymainProps): JSX.Element => {
  const { result } = useAppSelector((store) => store.currency.currency);
  const [isAmountNotValid, setNotAmountValid] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [currency, setCurrencyState] = useState('');
  const setIsAmountValidRef = useRef<(isValid: boolean) => void>(() => {});
  const selectedOptionRef = useRef<string | null>(null);
  const dispatch = useAppDispatch();
  const handleCurrencySelection = (selectedOption: string | undefined) => {
    if (selectedOption) {
      console.log('Selected currency:', selectedOption);
      setCurrency(selectedOption);

      // Set the selected currency in the component state
      setCurrencyState(selectedOption);

      // Close the dropdown
      setIsActive(false);
      selectedOptionRef.current = selectedOption;
    }
  };

  useEffect(() => {
    // Validate the amount
    const isValid = validateAmount(amount || '');
    setNotAmountValid(isValid);
    setIsAmountValidRef.current(isValid);
  }, [amount, setNotAmountValid, setIsAmountValidRef]);

  const shouldDisplayError = amount !== undefined;

  const displayValue =
    isLoading || !isAmountNotValid ? '' : result?.toFixed(2) || '';

  return (
    <div className={`input-main ${shouldDisplayError ? 'error' : ''}`}>
      {isAmountNotValid && amount !== undefined && (
        <div className="error-message">Amount not valid</div>
      )}
      <div className="main">
        <div className="dropdown" style={{ minWidth: '100px' }}>
          <div
            className={`dropdown-btn ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
          >
            {selectedCurrency ? selectedCurrency : currency}
            <img
              src={down}
              className="w-[10px] h-[6px] cursor-pointer"
              alt="down"
            />
          </div>
          {isActive && (
            <div className="dropdown-content min-w-[200px]">
              {currencyOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleCurrencySelection(option)}
                  className={` ${
                    selectedOptionRef.current === option ? 'dot' : ''
                  }`}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {amount !== undefined ? (
          <input
            type="text"
            className={`input  ${
              isAmountNotValid || amount === '' ? 'error-boundary' : ''
            }`}
            value={amount}
            onChange={onChangeAmount}
          />
        ) : (
          <>
            {isLoading && (
              <div>
                <div className="loader"></div>
              </div>
            )}
            <input
              type="text"
              className={`input ${isLoading ? 'loading' : ''} ${
                shouldDisplayError ? 'error-border' : ''
              }`}
              value={displayValue}
              disabled
              onChange={onChangeAmount}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Currencymain;
