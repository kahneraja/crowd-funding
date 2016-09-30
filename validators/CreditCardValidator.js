let luhn = require("luhn");

class CreditCardValidator {
  static isValid(number) {
    
    if (number.length > 19)
      return false;

    const regex = /^\d+$/;
    if (!regex.test(number))
      return false;

    if(!luhn.validate(number))
      return false;

    return true;
  }
};

module.exports = CreditCardValidator;
