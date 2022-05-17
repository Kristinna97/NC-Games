const express = require("express");
const { getCategories } = require("./controllers/categories-controller");
const {
  getReviewById,
  updateReviewVotes,
  getReviews
} = require("./controllers/reviews-controller.js");

const { getUsers } = require("./controllers/users-controller");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", updateReviewVotes);

app.get("/api/users", getUsers);
app.get('/api/reviews', getReviews)

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
