import { makeComment } from "../controllers/commentController.js";
import comments from "../models/comment.js";

export const postComment = (req ,res, next) => {
  // req.body will receive comment value,

  const {comment} = req.body;
  const userId = req.session.user.id;
  console.log(req.session)
  makeComment(comment, userId);
  console.log(comments);
  return res.sendStatus(201);
}