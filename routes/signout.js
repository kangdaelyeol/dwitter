


export const getSignout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
}