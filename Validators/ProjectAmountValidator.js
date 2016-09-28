class ProjectAmountValidator {
  static isValid(amount) {
    const regex = /^[0-9.]+$/;
    if (!regex.test(amount))
      return false;

    return true;
  }
};

module.exports = ProjectAmountValidator;
