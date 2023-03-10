import { makeComment } from "../controllers/commentController.js";
import { renewUserInfo } from "../controllers/sessionController.js";

export const postComment = (req ,res, next) => {
  // req.body will receive comment value,

  const {comment} = req.body;
  const userId = req.session.user.id;
  makeComment(comment, userId);
  renewUserInfo(userId, req.session);
  console.log("after creating comment, session.user: ", req.session.user);
  return res.status(201).redirect("/");
}