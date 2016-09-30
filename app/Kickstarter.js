let NameValidator = require('../validators/NameValidator');
let AmountValidator = require('../validators/AmountValidator');
let Error = require('./Error');

var Kickstarter = function (projectApi){

  this.ProjectApi = projectApi;

  this.CreateProject = (name, amount) => {
    if (!NameValidator.isValid(name))
      return new Error("ERROR: This project name invalid.");

    if (!AmountValidator.isValid(amount))
      return new Error("ERROR: This amount invalid.");

    const response = this.ProjectApi.Add(name, amount);

    if (response.status === "ok")
      console.log(`Added ${response.data.name} project with target of $${response.data.amount}`);

    return response;
  };

  this.BackProject = (givenName, projectName, creditCard, amount) => {

    if (!NameValidator.isValid(givenName))
      return new Error("ERROR: This given name is invalid.");

    if (!NameValidator.isValid(projectName))
      return new Error("ERROR: This project name is invalid.");

    if (!NameValidator.isValid(creditCard))
      return new Error("ERROR: This card is invalid.");

    if (!AmountValidator.isValid(amount))
      return new Error("ERROR: Invalid amount.");

    const response = this.ProjectApi.Back(givenName, projectName, creditCard, amount);

    if (response.status === "ok"){
      console.log(`${response.data.givenName} backed project ${response.data.projectName} for $${response.data.amount}`);
    } else {
      console.log(`${response.message}`)
    }

    return response;
  };

  this.ListProjectBackings = (projectName) => {

    if (!NameValidator.isValid(projectName))
      return new Error("ERROR: This project name is invalid.");

    const response = this.ProjectApi.ListProjectBackings(projectName);

    let funding = 0;
    if (response.status === "ok"){
      for (let backing of response.data) {
        console.log(`-- ${backing.givenName} backed for $${backing.amount}`);
        funding += backing.amount;
      }
      if (response.summary.isSuccessful) {
        console.log(`${projectName} is successful!`);
      } else {
        const balance = response.targetAmount - funding;
        console.log(`${projectName} needs $${response.summary.balance} more dollars to be successful`);
      }
    }

    return response;
  };

  this.ListUserBackings = (givenName) => {

    if (!NameValidator.isValid(givenName))
      return new Error("ERROR: This name is invalid.");

    const response = this.ProjectApi.ListUserBackings(givenName);

    if (response.status === "ok"){
      for (let backing of response.data) {
        console.log(`-- Backed ${backing.projectName} for $${backing.amount}`);
      }
    }

    return response;
  };

};

module.exports = Kickstarter;
