
const fs = require("fs/promises");

exports.getEndpoints = (req, res, next) => {
  fs.readFile("endpoints.json", "utf8")
    .then((response) => {
      const parsedResponse = JSON.parse(response);
      res.status(200).send({ endpoints: parsedResponse });
    })
    .catch((err) => {
      next(err);
    });
};
