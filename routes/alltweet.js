export const getAlltweet = (req, res, next) => {
  req.session.mytweets = false;
  return res.redirect("/");
}