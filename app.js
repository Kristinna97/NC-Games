const express = require("express");
const { getCategories } = require("./controllers/categories-controller");

const app = express();
app.use(express.json());


app.get("/api/categories", getCategories);

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
