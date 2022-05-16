const db = require("../db/connection");

exports.fetchReviewById = (id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [id])
    .then((response) => {
      if (!response.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return response.rows[0];
    });
};
