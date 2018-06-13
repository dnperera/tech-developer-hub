const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//load validation
const validateProfileInputs = require("../../validation/profile");
const validateExperienceInputs = require("../../validation/experience");
//@route Get api/profile
//@desc Get current user's profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route Get api/profile/user/:user_id
//@desc Get profile by user id
//@access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        errors.noprofile = "Profile not found!.";
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      errors.noprofile = "Profile is not found!";
      res.json(errors);
    });
});
//@route Get api/profile/all
//@desc Get all profiles
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "No profiles found!";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      errors.noprofile = "Profiles not found!";
      res.status(404).json(errors);
    });
});

//@route Get api/profile/handle/:handle
//@desc Get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json(profile);
      } else {
        errors.noprofile = "Profile not found!.";
        return res.status(404).json(errors);
      }
    })
    .catch(err => {
      errors.noprofile = "Profile is not found!";
      res.status(404).json(errors);
    });
});

//@route Post api/profile
//@desc Create & Update user's profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInputs(req.body);
    //check Validation
    if (!isValid) {
      //Return any errors with 400 status code
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //Skills - split into an array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //Social Links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //check whether there is similar profile exist
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update the content
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create new profile
        //check newhandle already exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exist";
            res.status(400).json(errors);
          }
          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route Post api/experience
//@desc Add experience user's profile
//@access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInputs(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add Experience to the array
      profile.experience.unshift(newExp);
      //then save or update the profile
      profile.save().then(profile => res.json(profile));
    });
  }
);
module.exports = router;
