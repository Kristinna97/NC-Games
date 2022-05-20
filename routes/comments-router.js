const { deleteCommentById } = require("../controllers/comments-controller.js");

const commentsRouter = require("express").Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
