const express = require("express");
const { getCategories } = require("./controllers/categories-controller");
const {
        getReviewById,
        updateReviewVotes,
        getReviews
} = require("./controllers/reviews-controller.js");

const { getUsers } = require("./controllers/users-controller");
const {getCommentsByReviewId,
       postCommentOnReview,
       deleteCommentById} = require('./controllers/comments-controller.js')
 
const { handlePSQLErrors,
        handleCustomError}  = require('./controllers/errors-controller')      

const { getEndpoints } = require('./controllers/api-controller')

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", updateReviewVotes);

app.get("/api/users", getUsers);
app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId)
app.post('/api/reviews/:review_id/comments', postCommentOnReview)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/api' , getEndpoints)

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(handlePSQLErrors);

app.use(handleCustomError);

module.exports = app;
