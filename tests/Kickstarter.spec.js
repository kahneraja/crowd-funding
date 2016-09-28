var assert = require("assert");
var Kickstarter = require("../app/Kickstarter.js");
var ProjectApi = require("../api/MockProjectApi.js");

describe("Kickstarter", function() {
  describe("Projects", function() {

    let store = { projects:[] };
    let projectApi = new ProjectApi(store);

    before(() => {

    });

    it("Should add one new project", () => {
      let kickstarter = new Kickstarter(projectApi);
      let project = kickstarter.CreateProject("test", "1");
      assert.equal(1, projectApi.GetAll().length);
    });

    it("Should create new project with correct amount", () => {
      let kickstarter = new Kickstarter(projectApi);
      let project = kickstarter.CreateProject("test", "1.01");
      assert.equal(1.01, project.amount);
    });

  });
});
