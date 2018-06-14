const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load the models
const Post = require("../../models/Post");
//Load Validations
const validatePostInputs = require("../../validation/post");
//@route Get api/posts/test
//@desc Tests post route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Your Posts Route" });
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
