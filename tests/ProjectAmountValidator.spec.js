var assert = require("assert");
var validator = require("../Validators/ProjectAmountValidator.js");

describe("Project", () => {
  describe("Amount Validator", () => {

    it("Should accept both dollars.", () => {
      assert.equal(true, validator.isValid("1"));
    });

    it("Should accept cents.", () => {
      assert.equal(true, validator.isValid("1.01"));
    });

    it("Should not use the $ currency symbol.", () => {
      assert.equal(false, validator.isValid("$1"));
    });

  });
});
