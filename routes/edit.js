import { getCommentById, changeComment } from "../controllers/dbfactory.js";


export const getEdit = (req, res, next) => {
  const { id } = req.params;

  // change the type of value into a format of Number
  const commentId = Number(id);

  // get content
  const comment = getCommentById(commentId);
  const content = comment.content;
  if(!comment) return res.redirect('/');
  return res.render("edit.ejs", {commentId, content})
}

export const postEdit = (req, res, next) => {
  const { id } = req.params;
  const {content} = req.body;
  changeComment(id, content);
  return res.redirect("/");
}