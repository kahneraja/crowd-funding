process.stdin.resume();
process.stdin.setEncoding('utf8');
let Kickstarter = require('./app/Kickstarter');
let ProjectApi = require("./api/MockProjectApi");
let InitialState = require("./api/MockInitialState");
let projectApi = new ProjectApi(InitialState);
let kickstarter = new Kickstarter(projectApi);

process.stdin.on('data', function (text) {
  let inputArgs = text.trim().split(" ");
  if (inputArgs[0] === "project"){
    kickstarter.CreateProject(inputArgs[1], inputArgs[2]);
  } else if (inputArgs[0] === "back"){
    kickstarter.BackProject(inputArgs[1], inputArgs[2], inputArgs[3], inputArgs[4]);
  } else if (inputArgs[0] === "list"){
    kickstarter.ListProjectBackings(inputArgs[1]);
  } else if (inputArgs[0] === "backer"){
    kickstarter.ListUserBackings(inputArgs[1]);
  } else if (inputArgs[0] === 'quit') {
    done();
  } else {
    console.log("Unknown command.");
  }
});

function done() {
  process.exit();
}
