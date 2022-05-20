const {
  getReviewById,
  updateReviewVotes,
  getReviews,
  postReview
} = require("../controllers/reviews-controller.js");

const {
  getCommentsByReviewId,
  postCommentOnReview,
} = require("../controllers/comments-controller.js");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get(getReviews).post(postReview);

reviewsRouter
  .route("/:review_id")
  .get(getReviewById)
  .patch(updateReviewVotes);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentOnReview);

module.exports = reviewsRouter;
