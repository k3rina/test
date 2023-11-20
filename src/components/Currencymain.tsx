interface CurrencymainProps {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exchangeRate?: number;
  isLoading?: boolean;
  setIsAmountValidRef: (isValid: boolean) => void;
  amount?: string;
  setToCurrency: (currency: string) => void;
  toCurrency: string;
}

import CurrencyFlag from 'react-currency-flags';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../redux/store';
import '../styles/App.css';
import down from '../assets/down.svg';

import { validateAmount } from './utils';

interface CurrencyFlagComponentProps {
  currency: string;
}

const CurrencyFlagComponent1: React.FC<CurrencyFlagComponentProps> = ({
  currency,
}) => {
  if (!currency) {
 
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
  onChangeAmount,
  amount,
  toCurrency,
  setToCurrency,
}: CurrencymainProps): JSX.Element => {
  const { result } = useAppSelector((store) => store.currency.currency);
  const [isAmountNotValid, setNotAmountValid] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const setIsAmountValidRef = useRef<(isValid: boolean) => void>(() => {});
  const selectedOptionRef = useRef<string | null>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const handleCurrencySelection = (selectedOption: string | undefined) => {
    if (selectedOption) {
      console.log('Selected currency:', selectedOption);

      setToCurrency(selectedOption);

      
      setIsActive(false);
      selectedOptionRef.current = selectedOption;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContentRef.current &&
        !dropdownContentRef.current.contains(event.target as Node)
      ) {
       
        setIsActive(false);
      }
    };

  
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isActive]);

  useEffect(() => {

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
        <div className="popup">
          <div
            className="dropdown"
            onClick={(e) => {
              e.stopPropagation();
              setIsActive(!isActive);
            }}
          >
            <CurrencyFlagComponent1 currency={toCurrency || selectedCurrency} />
            <div className={`dropdown-btn ${isActive ? 'active' : ''}`}>
              {toCurrency || selectedCurrency}
              <img src={down} className="down" alt="down" />
            </div>
          </div>{' '}
          {isActive && (
            <div className="dropdown-content" ref={dropdownContentRef}>
              {currencyOptions.map((option) => (
                <div
                  className="dropdown_item"
                  key={option}
                  onClick={() => handleCurrencySelection(option)}
                >
                  <CurrencyFlagComponent1 currency={option} />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

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
      </div>
    </div>
  );
};

export default Currencymain;
