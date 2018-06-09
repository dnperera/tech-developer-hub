const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../../models/User");

//@route Get api/users/test
//@desc Test users route
//@access Public

router.get("/test", (req, res) => {
  res.json({ msg: "Your Users Route" });
});

//@route Get api/users/register
//@desc Register a new user
//@access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!!" });
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
  const email = req.body.email;
  const password = req.body.password;
  //Find the user by the email
  User.findOne({ email }).then(user => {
    //check user exists
    if (!user) {
      return res.status(404).json({ email: "User not found!" });
    }
    //Check user entered password match with db
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(404).json({ password: "Incorrect password !." });
      }
    });
  });
});
module.exports = router;
