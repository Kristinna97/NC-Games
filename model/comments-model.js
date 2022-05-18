const { use } = require("../app");
const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

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

exports.addCommentOnReview = (id, content) => {
  const { username, body } = content;
  if(!username || !body){
    return Promise.reject({ status: 400, msg: "Bad Request" });
  } 

   return db
    .query(
      `INSERT INTO comments (author,body,review_id) 
                      VALUES ($1, $2 , $3) 
                      RETURNING *;`,
      [username, body , id]
    )
    .then((response) => {
      return response.rows[0];
    });
};

exports.removeComment = (id) =>{
   return db.query('DELETE FROM comments WHERE comment_id = $1' , [id])
}