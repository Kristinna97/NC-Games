const { deleteCommentById, updateVotesOnComment } = require("../controllers/comments-controller.js");

const commentsRouter = require("express").Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById).patch(updateVotesOnComment);


module.exports = commentsRouter;
