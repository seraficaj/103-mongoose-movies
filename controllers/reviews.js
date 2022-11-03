const Movie = require("../models/movie");

module.exports = {
  create,
  delete: deleteReview,
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

function deleteReview(req, res, next) {
  // using "dot" syntax to query on the property of a subdoc
  Movie.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.user._id,
  }).then(function (movie) {
    // if no movie, go back to all movies
    if (!movie) return res.redirect("/movies");
    // remove the review using the remove method available on Mongoose Arrays
    movie.reviews.remove(req.params.id);
    // save the updated Movie document
    movie
      .save()
      .then(function () {
        // redirect back to show view
        res.redirect(`/movies/${movie._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}
