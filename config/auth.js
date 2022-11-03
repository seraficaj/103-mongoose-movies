// auth.js

// middleware for routes that require a logged in user

module.exports = function isLoggedIn(req, res, next) {
  // pass the req, res to next middleware/route handler
  if (req.isAuthenticated()) return next();
  // redirect to login page if the user is not already logged in
  res.redirect("/auth/google");
};
