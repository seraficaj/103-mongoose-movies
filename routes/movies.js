const express = require("express");
const router = express.Router();
const moviesCtrl = require("../controllers/movies");

router.get("/", moviesCtrl.index);
// use isLoggedIn middleware to protect routes
router.get("/new", moviesCtrl.new);
router.get("/:id", moviesCtrl.show);
router.post("/", moviesCtrl.create);

module.exports = router;
