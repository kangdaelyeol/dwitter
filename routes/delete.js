export const getDelete = (req, res, next) => {
  const { id } = req.params;

  // get ID -> 'id' is the comment's Id that's gonna be removed
  
  // verify if the user state is authorized to remove it.
  // because it's 'get' method, so everybody can access here with URL,
  // so others can remove every thing if they know only comment's Id.

  // if the login state is false, have to redirect.
  // TO DO: give user, login information from sessions in Back-end.
  if(!user || !login) return;

  // check if the corresponding comment exists according to id.
  // TO DO: make getCommentById in dbfactory.js
  const comment = getCommentById(id);
  if(!comment) return;
  
  // from this, user and comment information are existing,
  // verify if the comment is the user's own.
  const isIdExists = user.comments.includes(id);
  if(!isIdExists) return;

  // all sequences to verify are succeeded.
  // you can proceed with the deletion process
  // TO DO: make it in dbfactory.js
  deteteCommentById(id);
  res.redirect("/");
}