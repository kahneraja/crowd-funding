let assert = require("assert");
let Kickstarter = require("../app/Kickstarter");
let ProjectApi = require("../api/MockProjectApi");
let InitialState = require("../api/MockInitialState");

describe("Kickstarter", function() {
  describe("List User Backings", function() {

    let projectApi;
    beforeEach(() => {
      projectApi = new ProjectApi(InitialState);
    });

    it("Should return zero items for unknown user", () => {
      let kickstarter = new Kickstarter(projectApi);
      const response = kickstarter.ListUserBackings("User1");
      assert.equal(0, response.data.length);
    });

    it("Should list one project", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      let userName = "user1";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject(userName, projectName, 5213475159527783, "1");
      const response = kickstarter.ListUserBackings(userName);
      assert.equal(1, response.data.length);
    });

    it("Should list one project", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      let userName = "user1";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject(userName, projectName, 5213475159527783, "1");
      const response = kickstarter.ListUserBackings(userName);
      assert.equal(1, response.data.length);
    });

  });
});
