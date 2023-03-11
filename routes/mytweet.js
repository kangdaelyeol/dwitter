export const getMytweet = (req, res, next) => {
  req.session.mytweets = true;
  return res.redirect("/");
}