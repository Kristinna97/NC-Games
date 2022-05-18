const {
  fetchCommentsByReviewId,
  addCommentOnReview,
} = require("../model/comments-model");
const { checkExists } = require("../db/seeds/utils");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const promises = [
    fetchCommentsByReviewId(review_id),
    checkExists("reviews", "review_id", review_id),
  ];
  return Promise.all(promises)
    .then((response) => {
      res.status(200).send({ comments: response[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentOnReview = (req, res, next) => {
  const { review_id } = req.params;
  const content = req.body;
  addCommentOnReview(review_id, content)
    .then((addedComment) => {
      res.status(201).send({ comment : addedComment });
    })
    .catch((err) => {
      next(err);
    });
};
