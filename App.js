process.stdin.resume();
process.stdin.setEncoding('utf8');
let Kickstarter = require('./Kickstarter');
var ProjectApi = require("./api/MockProjectApi.js");

let store = {
  projects:[]
}

let projectApi = new ProjectApi(store);
let kickstarter = new Kickstarter(projectApi);

process.stdin.on('data', function (text) {
  let args = text.split(" ");
  if (args[0] === "project"){
    // project <project> <target amount>
    kickstarter.CreateProject(args[1], args[2]);
  } else if (args[0] === "back"){
    // back <given name> <project> <credit card number> <backing amount>
    kickstarter.BackProject(args[1], args[2], args[3], args[4]);
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
