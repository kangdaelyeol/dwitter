import { getCommentById, deleteCommentById } from "../controllers/dbfactory.js";
import { renewUserInfo } from "../controllers/sessionController.js";

export const getDelete = (req, res, next) => {
  const { id } = req.params;
  // type of id is a format of String. so it needs to be changed as "Number type";
  const commentId = Number(id);

  const login = req.session?.login;
  const user = req.session?.user;
  // get ID -> 'id' is the comment's Id that's gonna be removed
  
  // verify if the user state is authorized to remove it.
  // because it's 'get' method, so everybody can access here with URL,
  // so others can remove every thing if they know only comment's Id.
  // if the login state is false, have to redirect.
  if(!user || !login) return res.redirect("/");
  

  // check if the corresponding comment exists according to id.
  const comment = getCommentById(commentId);
  if(!comment) return res.redirect("/");
  
  // from this, user and comment information are existing,
  // verify if the comment is the user's own.
  const isIdExists = user.comments.includes(commentId);
  if(!isIdExists) return res.redirect("/");

  // all sequences to verify are succeeded.
  // you can proceed with the deletion process
  deleteCommentById(id, user.id);
  renewUserInfo(user.id, req.session);
  return res.redirect("/");
}