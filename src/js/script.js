/* eslint-disable no-cond-assign */
/* eslint-disable no-plusplus */
import '../sass/main.scss';

const acceptedCreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard:
    /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
};
/** @type {HTMLElement} */
const numberInput = document.querySelector('.form_input--number');
/** @type {HTMLElement} */
const cvvInput = document.querySelector('.form_input--cvc');
const btnSubmit = document.querySelector('.form__btn-submit');

numberInput.addEventListener('input', () => {
  console.log(validateCard(numberInput.value));
  if (validateCard(numberInput.value)) {
    console.log('valid');
  }
  let cursor = numberInput.selectionStart; // store cursor position
  const lastValue = numberInput.value; // get value before formatting
  const formattedValue = formatCardNumber(lastValue);
  numberInput.value = formattedValue; // set value to formatted

  // keep the cursor at the end on addition of spaces
  if (cursor === lastValue.length) {
    cursor = formattedValue.length;
    // decrement cursor when backspacing
    // i.e. "4444 |" => backspace => "4444|"
    if (
      numberInput.hasAttribute('data-lastvalue') &&
      numberInput.getAttribute('data-lastvalue').charAt(cursor - 1) === ' '
    ) {
      cursor--;
    }
  }
  if (lastValue !== formattedValue) {
    if (
      lastValue.charAt(cursor) === ' ' &&
      formattedValue.charAt(cursor - 1) === ' '
    ) {
      cursor++;
    }
  }
  numberInput.selectionStart = cursor;
  numberInput.selectionEnd = cursor;

  numberInput.setAttribute('data-lastvalue', formattedValue);
});
cvvInput.addEventListener('input', () => {
  if (validateCVV(numberInput.value, cvvInput.value)) console.log('valid cvv');
});
function formatCardNumber(val) {
  // remove all non digit characters
  const value = val.replace(/\D/g, '');
  let formattedValue;
  let maxLength;
  // american express, 15 digits
  if (/^3[47]\d{0,13}$/.test(value)) {
    formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    maxLength = 17;
  } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
    // diner's club, 14 digits
    formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
    maxLength = 16;
  } else if (/^\d{0,16}$/.test(value)) {
    // regular cc number, 16 digits
    formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
    maxLength = 19;
  }
  numberInput.setAttribute('maxlength', maxLength);
  return formattedValue;
}

function validateCard(val) {
  // remove all non digit characters
  const value = val.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  // loop through values starting at the rightmost side
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const valid = sum % 10 === 0;
  let accepted = false;

  // loop through the keys (visa, mastercard, amex, etc.)
  Object.keys(acceptedCreditCards).forEach((key) => {
    const regex = acceptedCreditCards[key];
    if (regex.test(value)) {
      accepted = true;
    }
  });

  return valid && accepted;
}

function validateCVV(creditCardVal, cvvVal) {
  // remove all non digit characters
  const creditCard = creditCardVal.replace(/\D/g, '');
  const cvv = cvvVal.replace(/\D/g, '');
  // american express and cvv is 4 digits
  if (acceptedCreditCards.amex.test(creditCard)) {
    if (/^\d{4}$/.test(cvv)) return true;
  } else if (/^\d{3}$/.test(cvv)) {
    // other card & cvv is 3 digits
    return true;
  }
  return false;
}
