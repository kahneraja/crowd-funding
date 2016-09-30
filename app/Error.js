let Error = function (message){
  console.log(message);
  return {
    status: "error",
    message: message
  }
}
module.exports = Error;
