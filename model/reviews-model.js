const db = require("../db/connection");

exports.fetchReviewById = (id) => {
  return db
    .query(
      `SELECT reviews.*,
       CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
       FROM reviews LEFT OUTER JOIN comments 
       ON reviews.review_id = comments.review_id
       WHERE reviews.review_id = $1 
       GROUP BY reviews.review_id`,
      [id]
    )
    .then((response) => {
      if (!response.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return response.rows[0];
    });
};

exports.updateVotes = (id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING * ",
      [inc_votes, id]
    )
    .then((response) => {
      if (!response.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return response.rows[0];
    });
};
