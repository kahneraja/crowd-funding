let assert = require("assert");
let Kickstarter = require("../app/Kickstarter");
let ProjectApi = require("../api/MockProjectApi");
let InitialState = require("../api/MockInitialState");

describe("Kickstarter", function() {
  describe("Back", function() {

    let projectApi;
    beforeEach(() => {
      projectApi = new ProjectApi(InitialState);
    });

    it("Should not back unknown project", () => {
      let kickstarter = new Kickstarter(projectApi);

      const response = kickstarter.BackProject("User1", "Project1", "5213475159527783", "1");
      assert.equal("error", response.status);
    });

    it("Should back project", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "projectA";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.BackProject("user1", projectName, "5213475159527783", "1");
      assert.equal("ok", response.status);
    });

    it("Should not back project with invalid given name", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "project1";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.BackProject("a", projectName, "5213475159527783", "1");
      assert.equal("error", response.status);
    });

    it("Should not back project with invalid project name", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "a";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.BackProject("user1", projectName, "5213475159527783", "1");
      assert.equal("error", response.status);
    });

    it("Should not back project with invalid credit card", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "a";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.BackProject("user1", projectName, "", "1");
      assert.equal("error", response.status);
    });

    it("Should not back project with invalid amount", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "Project1";
      kickstarter.CreateProject(projectName, "1");
      const response = kickstarter.BackProject("user1", projectName, "5213475159527783", "");
      assert.equal("error", response.status);
    });

    it("Should not back project with credit card used by different user", () => {
      let kickstarter = new Kickstarter(projectApi);

      let projectName = "Project1";
      let creditCard = "5213475159527783";
      kickstarter.CreateProject(projectName, "1");
      kickstarter.BackProject("user1", projectName, creditCard, "1");
      const response = kickstarter.BackProject("user2", projectName, creditCard, "1");
      assert.equal("error", response.status);
    });

  });
});
