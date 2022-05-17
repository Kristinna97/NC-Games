const db = require("../db/connection");

exports.fetchCommentsByReviewId = (id) => {
  return db
    .query(
      `SELECT * FROM comments
                    WHERE review_id = $1 `,
      [id]
    )
    .then((response) => {
     return response.rows;
    });
};
