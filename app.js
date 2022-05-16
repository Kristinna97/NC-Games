const express = require("express");
const { getCategories } = require("./controllers/categories-controller");
const { getReviewById } = require("./controllers/reviews-controller.js");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = app;