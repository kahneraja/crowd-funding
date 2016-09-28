var assert = require("assert");
var ProjectNameValidator = require("../Validators/ProjectNameValidator.js");

describe("Project", () => {
  describe("Name Validator", () => {

    it("Should be alphanumeric.", () => {
      assert.equal(true, ProjectNameValidator.isValid("abcd123"));
    });

    it("Should allow underscores.", () => {
      assert.equal(true, ProjectNameValidator.isValid("a_bc"));
    });

    it("Should allow dashes.", () => {
      assert.equal(true, ProjectNameValidator.isValid("a-bc"));
    });

    it("Should not allow other special characters.", () => {
      assert.equal(false, ProjectNameValidator.isValid("a&bc"));
      assert.equal(false, ProjectNameValidator.isValid("a*bc"));
      assert.equal(false, ProjectNameValidator.isValid("a@bc"));
    });

    it("Should be no shorter than 4 characters.", () => {
      assert.equal(false, ProjectNameValidator.isValid("abc"));
    });

    it("Should be no longer than 20 characters.", () => {
      assert.equal(false, ProjectNameValidator.isValid("123456789012345678901"));
    });

  });
});
