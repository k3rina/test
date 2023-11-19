// export const validateAmount = (value: string): boolean => {
//   console.log('Validating amount:', value);

//   const isNumber = !isNaN(parseFloat(value));
//   const isValid =
//     isNumber && /^[0-9]+(\.[0-9]{0,2})?$/.test(value) && value !== '0';
//   console.log('Is valid:', isValid);
//   return isValid;
// };

// export const validateAmount = (value: string): boolean => {
//   console.log('Validating amount:', value);

//   // If the value is an empty string, consider it invalid
//   if (value == '') {
//     console.log('Is valid: false (empty string)');
//     return false;
//   }

//   // Check if the value matches the numeric pattern

//   const matchesPattern = /^\d+(\.\d{0,2})?$/.test(value);
//   console.log('Value:', value);
//   console.log('Matches pattern:', matchesPattern);

//   // The value is valid if it matches the numeric pattern
//   const isValid = matchesPattern;
//   console.log('Is valid:', isValid);

//   return isValid;
// };

export const validateAmount = (value: string): boolean => {
  console.log('Validating amount:', value);

  // If the value is undefined or contains any non-numeric symbols, consider it invalid
  const hasNonNumericSymbols = /^[0-9]*(\.[0-9]{0,2})?$/.test(value);

  // If the value is an empty string or contains non-numeric symbols, consider it invalid
  const isValid = value == '' || !hasNonNumericSymbols;
  console.log('Is valid:', isValid);

  return isValid;
};
