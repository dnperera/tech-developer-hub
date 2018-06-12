const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");

//@route Get api/profile/test
//@desc Tests profile route
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Your Profile Route" });
});

module.exports = router;
