let Project = require('./Project');
let ProjectNameValidator = require('./Validators/ProjectNameValidator');
let ProjectAmountValidator = require('./Validators/ProjectAmountValidator');

var Kickstarter = function (projectApi){

  this.ProjectApi = projectApi;

  this.CreateProject = (name, amount) => {

    if (!ProjectNameValidator.isValid(name)){
      return console.log("Invalid project name.");
    }

    if (!ProjectAmountValidator.isValid(amount)){
      return console.log("Invalid project amount.");
    }

    let project = new Project(name, amount);
    this.ProjectApi.Add(project);
    console.log("Added "+project.name+" project with target of $" + project.amount);

    return project;
  };

};

module.exports = Kickstarter;
