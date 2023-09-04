module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  console.log ("IN THE RIS LOGGED OUT 4  *********   ");
  if (req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};