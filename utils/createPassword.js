const {
  pwAlpha,
  pwNumbers,
} = require('../config/config');

const createPassword = (options) => {
  const { length, numbers, symbols, useSymbols, useOnly } = options;

  const chars = getPasswordChars(numbers, symbols, useSymbols, useOnly);

  const generatedPassword = generatePassword(chars, length);

  return(generatedPassword);
}

const getPasswordChars = (hasNumbers, hasSymbols, useSymbols, useOnly='') => {
  if (useOnly) {
    return useOnly; // overwrite chars with characters in only argument
  } else {
    let chars = pwAlpha;
    hasNumbers ? (chars += pwNumbers) : '';
    hasSymbols ? (chars += useSymbols) : '';
    return chars;
  }
}

const generatePassword = (chars, length) => {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

module.exports = createPassword;