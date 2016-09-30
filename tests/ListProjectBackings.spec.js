let assert = require("assert");
let Kickstarter = require("../app/Kickstarter");
let ProjectApi = require("../api/MockProjectApi");
let InitialState = require("../api/MockInitialState");

describe("Kickstarter", function() {
  describe("List Project Backings", function() {

    let projectApi;
    beforeEach(() => {
      projectApi = new ProjectApi(InitialState);
    });

    it("Should return error for unknown project", () => {
      let kickstarter = new Kickstarter(projectApi);
      const response = kickstarter.ListProjectBackings("Project1");
      assert.equal("error", response.status);
    });

    it("Should list one backing", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject("user1", projectName, 5213475159527783, "1");
      const response = kickstarter.ListProjectBackings(projectName);
      assert.equal(1, response.data.length);
    });

    it("Should list two backings", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject("user1", projectName, 5213475159527783, "1");
      kickstarter.BackProject("user2", projectName, 5523772206990716, "1");
      const response = kickstarter.ListProjectBackings(projectName);
      assert.equal(2, response.data.length);
    });

    it("Should reach zero balance and successful", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject("user1", projectName, 5213475159527783, "1");
      const response = kickstarter.ListProjectBackings(projectName);
      assert.equal(true, response.summary.isSuccessful);
      assert.equal(0, response.summary.balance);
    });

    it("Should have $1 balance and not successful", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.ListProjectBackings(projectName);
      assert.equal(false, response.summary.isSuccessful);
      assert.equal(1, response.summary.balance);
    });

  });
});
