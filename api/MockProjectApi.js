let _ = require('lodash');

var MockProjectApi = function (store){

  this.store = store;

  this.Add = (project) => {
    const p = Object.assign({}, project);
    this.store.projects.push(p);
  };

  this.Back = (name, amount) => {
    let project = _.find(this.store, {name: "name"});
    let backing = {
      name: name,
      amount: amount
    };
    project.backings.push(backing);
  };

  this.GetAll = () => {
    return Object.assign([], this.store.projects);
  };

};

module.exports = MockProjectApi;
