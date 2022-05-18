const {
  fetchReviewById,
  updateVotes,
  fetchReviews,
} = require("../model/reviews-model");

exports.getReviewById = (req, res, next) => {
  const id = req.params.review_id;
  fetchReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateReviewVotes = (req, res, next) => {
  const id = req.params.review_id;
  const { inc_votes } = req.body;
  updateVotes(id, inc_votes)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  fetchReviews(sort_by, order, category).then((reviews) => {
    res.status(200).send({ reviews });
  }).catch((err) => {
    next(err)
  })
};
