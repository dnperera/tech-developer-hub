const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load the models
const Post = require("../../models/Post");
//Load Validations
const validatePostInputs = require("../../validation/post");

//@route Get api/posts
//@desc Get all available posts
//@access public
router.get("/", (req, res) => {
  const errors = {};
  Post.find({})
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      errors.nopostsfound = "No posts found";
      res.status(404).json(errors);
    });
});

//@route Get api/posts/:id
//@desc Get a post by id.
//@access public
router.get("/:id", (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => {
      errors.nopostfound = "No post found.";
      console.log(error);
      res.status(404).json(errors);
    });
});
//@route Post api/posts
//@desc create new post route
//@access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInputs(req.body);
    //check whether there is any validation errors
    if (!isValid) {
      res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => {
      res.json(post);
    });
  }
);
module.exports = router;
