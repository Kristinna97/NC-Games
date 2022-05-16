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

exports.updateVotes = (id, inc_votes) => {
    if(!inc_votes){
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
