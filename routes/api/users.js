const express = require("express");
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
router.get("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!!" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
    }
  });
});
module.exports = router;
