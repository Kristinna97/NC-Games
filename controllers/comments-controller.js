const {
  fetchCommentsByReviewId,
  addCommentOnReview,
  removeComment,
  addVotesOnComment,
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
      res.status(201).send({ comment: addedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  const promises = [
    removeComment(comment_id),
    checkExists("comments", "comment_id", comment_id),
  ];

  return Promise.all(promises)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateVotesOnComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  const promises = [
    addVotesOnComment(comment_id, inc_votes),
    checkExists("comments", "comment_id", comment_id),
  ];
  return Promise.all(promises)
  .then((response) => {
    res.status(200).send({ updatedComment : response[0] });
  }).catch((err) => {
    next(err)
  })
};
