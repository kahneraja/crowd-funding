process.stdin.resume();
process.stdin.setEncoding('utf8');
let Kickstarter = require('./app/Kickstarter');
var ProjectApi = require("./api/MockProjectApi.js");

let store = {
  projects:[]
}

let projectApi = new ProjectApi(store);
let kickstarter = new Kickstarter(projectApi);

process.stdin.on('data', function (text) {
  let inputArgs = text.trim().split(" ");
  if (inputArgs[0] === "project"){
    // project <project> <target amount>
    kickstarter.CreateProject(inputArgs[1], inputArgs[2]);
  } else if (inputArgs[0] === "back"){
    // back <given name> <project> <credit card number> <backing amount>
    kickstarter.BackProject(inputArgs[1], inputArgs[2], inputArgs[3], inputArgs[4]);
  } else {
    console.log("Unknown command.");
  }
  if (text === 'quit\n') {
    done();
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
