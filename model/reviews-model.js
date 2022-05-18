const db = require("../db/connection");

exports.fetchReviewById = (id) => {
  return db
    .query(
      `SELECT reviews.*,
       CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
       FROM reviews LEFT JOIN comments 
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

exports.fetchReviews = (sort_by = "created_at", order = "desc", category) => {
  const validSorts = [
    "created_at",
    "votes",
    "category",
    "owner",
    "title",
    "review_id",
    "comment_count",
  ];

  const validCategories = ["euro game", "dexterity", "social deduction"];

  let queryStr = `SELECT owner,
  title,
  reviews.review_id,
  category,
  review_img_url,
  reviews.created_at,
  reviews.votes,
  CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
  FROM reviews LEFT JOIN comments 
  ON reviews.review_id = comments.review_id`;

  if (category) {
    if (validCategories.includes(category)) {
      queryStr += ` WHERE category='${category}' GROUP BY reviews.review_id`;
    } else {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
  } else {
    queryStr += ` GROUP BY reviews.review_id`;
  }

  if (validSorts.includes(sort_by)) {
    if (order === "asc") {
      queryStr += ` ORDER BY ${sort_by} ASC`;
    } else if (order === "desc") {
      queryStr += ` ORDER BY ${sort_by} DESC`;
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
