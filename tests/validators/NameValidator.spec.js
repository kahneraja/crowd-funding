let assert = require("assert");
let NameValidator = require("../../validators/NameValidator.js");

describe("Project", () => {
  describe("Name Validator", () => {

    it("Should be alphanumeric.", () => {
      assert.equal(true, NameValidator.isValid("abcd123"));
    });

    it("Should allow underscores.", () => {
      assert.equal(true, NameValidator.isValid("a_bc"));
    });

    it("Should allow dashes.", () => {
      assert.equal(true, NameValidator.isValid("a-bc"));
    });

    it("Should not allow other special characters.", () => {
      assert.equal(false, NameValidator.isValid("a&bc"));
      assert.equal(false, NameValidator.isValid("a*bc"));
      assert.equal(false, NameValidator.isValid("a@bc"));
    });

    it("Should be no shorter than 4 characters.", () => {
      assert.equal(false, NameValidator.isValid("abc"));
    });

    it("Should be no longer than 20 characters.", () => {
      assert.equal(false, NameValidator.isValid("123456789012345678901"));
    });

  });
});
