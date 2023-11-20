export const validateAmount = (value: string): boolean => {
  const hasNonNumericSymbols = /^[0-9]*(\.[0-9]{0,2})?$/.test(value);

  const isValid = value == '' || !hasNonNumericSymbols;

  return isValid;
};
