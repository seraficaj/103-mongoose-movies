const Movie = require("../models/movie");

module.exports = {
  create,
};

function create(req, res) {
  // Find the movie to embed the review within
  Movie.findById(req.params.id, function (err, movie) {
    // add user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    movie.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    console.log(movie);
    movie.save(function (err) {
      if (err) console.log(err);
      res.redirect(`/movies/${movie._id}`);
    });
  });
}
