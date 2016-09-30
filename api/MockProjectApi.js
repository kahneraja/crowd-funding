let _ = require('lodash');

var MockProjectApi = function (store){

  // HACK: object.assign not packaged into current version of nodejs.
  this.store = JSON.parse(JSON.stringify(store));

  this.Add = (name, amount) => {
    const project = {
      id: this.store.projects.length + 1,
      name: name,
      amount: parseFloat(amount)
    };
    this.store.projects.push(project);
    const response = {
      status: "ok",
      data: project
    };
    return response;
  };

  this.Back = (givenName, projectName, creditCard, amount) => {

    const project = _.find(this.store.projects, {name: projectName});
    if (!project)
      return {
        status: "error",
        message: "ERROR: That project does not exist."
      };

    if (_.some(this.store.backings, (backing) => {
      return (backing.givenName != givenName && backing.creditCard === creditCard);
    }))
      return {
        status: "error",
        message: "ERROR: That card has already been added by another user!"
      };

    const backing = {
      id: this.store.backings.length + 1,
      givenName: givenName,
      projectName: projectName,
      creditCard: creditCard,
      amount: parseFloat(amount)
    };

    this.store.backings.push(backing);
    const response = {
      status: "ok",
      data: backing
    };
    return response;
  };

  this.ListProjectBackings = (projectName) => {

    const project = _.find(this.store.projects, {name: projectName});
    if (!project)
      return {
        status: "error"
      };

    const backings = _.filter(this.store.backings, {projectName: projectName});
    const funding = _.sumBy(backings, (backing) => { return backing.amount});
    const isSuccessful = (funding >= project.amount);
    let balance = 0;
    if (!isSuccessful)
      balance = project.amount - funding;
    return {
      status: "ok",
      summary: {
        targetAmount: project.amount,
        funding: funding,
        isSuccessful: isSuccessful,
        balance: balance
      },
      data: backings
    };
  };

  this.ListUserBackings = (givenName) => {
    const backings = _.filter(this.store.backings, {givenName: givenName});
    const response = {
      status: "ok",
      data: backings
    };
    return response;
  };

};

module.exports = MockProjectApi;
