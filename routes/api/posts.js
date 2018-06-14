const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load the models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
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
    newPost
      .save()
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        console.log(err);
        res.json({ postsavingerror: "New post can not be saved !" });
      });
  }
);

//@route Delete api/posts/:id
//@desc Delete a post by id.
//@access Private - user can delete only his own posts

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //make sure only profile owener can delete his post
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //if the post's user id does not match with logged in user
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ noauthorized: "User not authorized!." });
          }
          //delete
          post.remove().then(res.json({ success: true }));
        })
        .catch(err => {
          console.log("Error-->", err);
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

//@route Post api/posts/likes:id
//@desc add likes for the selected post.
//@access Private

router.post(
  "/likes:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //make sure only profile owener can delete his post
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check user already liked this post
          if (
            post.likes.filter(like => {
              like.user.toString() === req.user.id;
            }).length > 0
          ) {
            return res.status(400).json({
              alreadyliked: "User already liked this post"
            });
          }
          //Add user to the likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          console.log("Error-->", err);
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

//@route Post api/posts/like/:id
//@desc add likes for the selected post.
//@access Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check user already liked this post
          if (
            post.likes.filter(like => {
              like.user.toString() === req.user.id;
            }).length > 0
          ) {
            return res.status(400).json({
              alreadyliked: "User already liked this post"
            });
          }
          //Add user to the likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          console.log("Error-->", err);
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

//@route Post api/posts/unlike/:id
//@desc remove likes for the selected post.
//@access Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check user already liked this post or not
          if (
            post.likes.filter(like => {
              return like.user.toString() === req.user.id;
            }).length === 0
          ) {
            return res.status(400).json({
              notliked: "You have not lied this post yet."
            });
          }
          //Remove user from likes array
          let filteredLikes = post.likes.filter(like => {
            return like.user.toString() !== req.user.id;
          });
          //Assign filterd likes array to the post and save
          post.likes = [...filteredLikes];
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          console.log("Error-->", err);
          res.status(404).json({ postnotfound: "No post found" });
        });
    });
  }
);

//@route Post api/posts/comment/:id
//@desc add comment for the selected post.
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //vlaidate comment
    const { errors, isValid } = validatePostInputs(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Find the post
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add new comment to the  array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        console.log("Error-->", err);
        res.status(404).json({ postnotfound: "No post found to add comments" });
      });
  }
);

//@route Delete api/posts/comment/:id/:comment_id
//@desc remove comment from the selected post.
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Find the post
    Post.findById(req.params.id)
      .then(post => {
        //check comment exist on the comment array
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnoexist: "Comment does not exist" });
        }
        //if the comment exist , filter the comment array
        let filteredComments = post.comments.filter(
          comment => comment._id.toString() !== req.params.comment_id
        );
        //assign new filtered array to comments
        post.comments = [...filteredComments];
        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => {
        console.log("Error-->", err);
        res
          .status(404)
          .json({ postnotfound: "No post found to remove comments" });
      });
  }
);
module.exports = router;
