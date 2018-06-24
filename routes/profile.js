const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");
const validator = require("validator");
const Profile = require("./../models/profile");
const async = require("async");
const auth = require("./../util/helper");

/* create uid passport pancard */

/* pancard passport uid */

router.post("/createProfile", auth.requireAuth, (req, res) => {
  async.waterfall(
    [
      function(cb) {
        if (!req.body.type) {
          return cb("Please provide a type.");
        }
        if (!req.body.id) {
          return cb("Please provide ID.");
        }
        if (!req.body.address) {
          return cb("Please provide  Address.");
        }
        if (!req.body.fullName) {
          return cb("Please provide  Full Name.");
        }
        if (!req.body.DOB) {
          return cb("Please provide Date of Birth.");
        }
        cb(null);
      },
      function(cb) {
        Profile.findOne({ user: req.user._id }).then(profile => {
          if (!profile) {
            const newProfile = new Profile({
              user: req.user._id
            });
            newProfile.save(function(err, savedProfile) {
              if (err) return cb(err);
              cb(null, savedProfile);
            });
          } else {
            cb(null, profile);
          }
        });
      },
      function(profile, cb) {
        if (req.body.type === "UID") {
          profile.UID = req.body;
        }
        if (req.body.type === "passport") {
          profile.passport = req.body;
        }
        if (req.body.type === "PanCard") {
          profile.PanCard = req.body;
        }
        profile.save(function(err, savedProfile) {
          if (err) return cb(err);
          cb(null);
        });
      }
    ],
    function(err) {
      if (err) return res.json({ success: false, message: err });
      res.json({ success: true, message: "profile created." });
    }
  );
});

/* pagination  */
router.get("/allProfile", auth.requireAuth, (req, res) => {
  Profile.find()
    .sort({
      createdOn: -1
    })
    .populate({ path: "user", select: "email username " })
    // .skip((req.query.skip - 1) * req.query.limit)
    // .limit(req.query.limit)
    .then(profiles => {
      if (profiles.length == 0)
        return (
          res, json({ success: false, message: "No Profile is created yet!" })
        );
      res.json({
        success: true,
        data: profiles
      });
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: err
      })
    );
});

router.get("/getPieChartResult", auth.requireAuth, (req, res) => {
  Profile.find()
    .then(profiles => {
      if (profiles.length == 0)
        return (
          res, json({ success: false, message: "No Profile is created yet!" })
        );
      var UIDCount = 0,
        passportCount = 0,
        PanCardCount = 0;
      var finalResult = [];
      async.eachSeries(
        profiles,
        (item, next) => {
          if (item.UID.id) UIDCount++;
          if (item.passport.id) passportCount++;
          if (item.PanCard.id) PanCardCount++;
          next();
        },
        err => {
          if (err)
            return res.json({
              success: false,
              data: err
            });
          res.json({
            success: false,
            message: finalResult.concat(UIDCount, passportCount, PanCardCount)
          });
        }
      );
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: err
      })
    );
});

router.get("/getUserProfile", auth.requireAuth, (req, res) => {
  Profile.findOne({ user: req.user._id })
    .populate({ path: "user", select: "username email" })
    .then(profile => {
      if (!profile)
        return res.json({
          success: false,
          message: "No profile with this Id.",
          isProfile: false
        });
      res.json({
        success: true,
        message: profile,
        isProfile: true
      });
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: err
      })
    );
});

router.get("/getById/:id", auth.requireAuth, (req, res) => {
  if (!req.params.id)
    return res.json({
      success: false,
      message: "Please Provide id"
    });
  Profile.findById(req.params.id)
    .populate({ path: "user", select: "username email" })
    .then(profile => {
      if (!profile)
        return res.json({
          success: false,
          message: profile
        });
      res.json({
        success: true,
        message: profile
      });
    })
    .catch(err =>
      res.status(404).json({
        success: false,
        message: err
      })
    );
});

router.post(`/deleteProfileInfo`, auth.requireAuth, (req, res) => {
  if (!req.body.type)
    return res.json({
      success: false,
      message: "Please Provide type"
    });
  Profile.findOne({
    user: req.user._id
  }).then(profile => {
    if (!profile)
      return res.json({ success: false, message: "No such profile." });
    if (profile.user.toString() == req.user._id) {
      if (req.body.type == "UID") profile.UID = {};
      if (req.body.type == "passport") profile.passport = {};
      if (req.body.type == "PanCard") profile.PanCard = {};
      profile
        .save()
        .then(() =>
          res.json({ success: true, message: `${req.body.type} Deleted.` })
        );
    } else {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }
  });
});

router.put("/updateById/:id", auth.requireAuth, (req, res) => {});

router.delete("/deleteById/:id", auth.requireAuth, (req, res) => {
  if (!req.params.id)
    return res.json({
      success: false,
      message: "Please Provide id"
    });
  Profile.findOne({
    user: req.params.id
  }).then(profile => {
    if (!profile)
      return res.json({ success: false, message: "No such profile." });
    if (profile.user.toString() == req.user._id || req.user.role == "Admin") {
      profile
        .remove()
        .then(() => res.json({ success: true, message: "Profile Deleted." }));
    } else {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }
  });
});

module.exports = router;
