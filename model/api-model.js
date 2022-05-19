const fs = require("fs/promises");

exports.readEndpoints = () => {
  return fs.readFile("endpoints.json", "utf8")
  .then((response) => {
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  });
};
