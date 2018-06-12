const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../models/User");
const { jwtSecret } = require("../../config/keys");
const passport = require("passport");

//Load input validations
const validateRegisterInputs = require("../../validation/register");
const validateLoginInputs = require("../../validation/login");

//@route Get api/users/register
//@desc Register a new user
//@access Public
router.post("/register", (req, res) => {
  //validate incoming request data
  const { errors, isValid } = validateRegisterInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    errors.email = "Email already exists!!";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      const salt = bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(404).json(err);
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route Get api/users/login
//@desc Login user / Returning JWT token
//@access Public
router.post("/login", (req, res) => {
  //validate incoming request data
  const { errors, isValid } = validateLoginInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //Find the user by the email
  User.findOne({ email }).then(user => {
    //check user exists
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json({ errors });
    }
    //Check user entered password match with db
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email,
          avatar: user.avatar
        };
        jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            return res
              .status(404)
              .json({ token: "Error in creating new token" });
          } else {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        });
      } else {
        errors.password = "Incorrect password !.";
        return res.status(404).json(errors);
      }
    });
  });
});

//@route Get api/users/current
//@desc Return current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = router;
