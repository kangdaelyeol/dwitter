import { makeComment } from "../controllers/commentControlle.js";


export const postComment = (req ,res, next) => {
  // req.body will receive comment value,

  const {comment} = req.body;
  const userId = req.session.user.id;
  makeComment(comment, userId);

  return res.sendStatus(201);
}