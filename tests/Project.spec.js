let assert = require("assert");
let Kickstarter = require("../app/Kickstarter");
let ProjectApi = require("../api/MockProjectApi");
let InitialState = require("../api/MockInitialState");

describe("Kickstarter", function() {
  describe("Project", function() {

    let projectApi;
    beforeEach(() => {
      projectApi = new ProjectApi(InitialState);
    });

    it("Should add one new project", () => {
      let kickstarter = new Kickstarter(projectApi);
      let response = kickstarter.CreateProject("test", "1");
      assert.equal("ok", response.status);
    });

    it("Should create new project with correct amount", () => {
      let kickstarter = new Kickstarter(projectApi);
      let response = kickstarter.CreateProject("test", "1.01");
      assert.equal(1.01, response.data.amount);
    });

    it("Should not add new project with invalid name", () => {
      let kickstarter = new Kickstarter(projectApi);
      let response = kickstarter.CreateProject("a", "1");
      assert.equal("error", response.status);
    });

    it("Should not add new project with invalid amount", () => {
      let kickstarter = new Kickstarter(projectApi);
      let response = kickstarter.CreateProject("abcd", "$1");
      assert.equal("error", response.status);
    });

  });
});
