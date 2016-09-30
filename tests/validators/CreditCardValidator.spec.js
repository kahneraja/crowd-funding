let assert = require("assert");
let validator = require("../../validators/CreditCardValidator.js");

describe("Validation", () => {
  describe("CreditCard Validator", () => {

    it("Should vary up to 19 characters.", () => {
      assert.equal(true, validator.isValid("6304219447607087665"));
      assert.equal(false, validator.isValid("63042194476070876651"));
    });

    it("Should always be numeric.", () => {
      assert.equal(false, validator.isValid("a"));
    });

    it("Should be validated using Luhn-10.", () => {
      assert.equal(true, validator.isValid("49927398716"));
      assert.equal(false, validator.isValid("49927398717"));
    });

  });
});
