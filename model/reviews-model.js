const db = require("../db/connection");

exports.fetchReviewById = (id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [id])
    .then((review) => {
      if (!review.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return review.rows[0];
    });
};
