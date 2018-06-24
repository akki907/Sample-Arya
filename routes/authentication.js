const express = require("express");
const router = express.Router();

const User = require("../models/user");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const passport = require("passport");
const auth = require("./../util/helper");
router.post("/register", (req, res) => {
  if (!req.body.email) {
    res.json({ success: false, message: "You must provide a e-mail" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "You must provide a password" });
  } else if (!req.body.username) {
    res.json({ success: false, message: "You must provide a username" });
  } else if (!validator.isEmail(req.body.email)) {
    res.json({ success: false, message: "Must be a valid email" });
  } else if (!req.body.fullName) {
    res.json({ success: false, message: "You must provide a Full Name" });
  } else {
    var user = new User(req.body);
    user.save(function(err, user) {
      if (err) {
        if (err.code == 11000) {
          return res.json({
            success: false,
            message: "Username or email already exists."
          });
        } else if (err.errors) {
          if (err.errors.email) {
            return res.json({
              success: false,
              message: err.errors.email.message
            });
          } else if (err.errors.username) {
            return res.json({
              success: false,
              message: err.errors.username.message
            });
          } else if (err.errors.password) {
            return res.json({
              success: false,
              message: err.errors.password.message
            });
          } else {
            return res.json({ success: false, message: err });
          }
        } else {
          return res.json({
            success: false,
            message: "User could not save(error)."
          });
        }
      } else {
        res.json({ success: true, message: "User created" });
      }
    });
  }
});

//checkEmail

router.get("/checkEmail/:email", (req, res) => {
  if (!req.params.email) {
    return res.json({ success: false, message: "E-mail was not provided" });
  } else {
    User.findOne({ email: req.params.email }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (user) {
        res.json({ success: false, message: "E-mail is already taken" });
      } else {
        res.json({ success: true, message: "E-mail is available" });
      }
    });
  }
});

//checkusername
router.get("/checkUserName/:username", (req, res) => {
  if (!req.params.username) {
    return res.json({ success: false, message: "UserName was not provided" });
  } else {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (user) {
        res.json({ success: false, message: "UserName is already taken" });
      } else {
        res.json({ success: true, message: "UserName is available" });
      }
    });
  }
});

//login api

router.post("/login", (req, res) => {
  if (!req.body.username) {
    return res.json({ success: false, message: "UserName was not provided" });
  } else if (!req.body.password) {
    return res.json({ success: false, message: "Password was not provided" });
  } else {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return res.json({ success: false, message: err });
      if (!user)
        return res.json({ success: false, message: "UserName not Found" });
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({ success: false, message: "password Invalid" });
      } else {
        jwt.sign(
          {
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            username: user.username,
            fullName:user.fullName
          },
          config.secret,
          {
            expiresIn: "12h"
          },
          (err, token) => {
            if (err)
              return res.json({
                success: false,
                message: err
              });
            res.json({
              success: true,
              message: `You are welcome to your account ${user.fullName}`,
              token: token
            });
          }
        );

        //    var token =  jwt.sign({ _id : user._id,email:user.email},config.secret,{ expiresIn : '24h'});
        //     res.json({success:true,message:'Login SuccessFull',token:token,user:{username: user.username,email:user.email}})
      }
    });
  }
});

router.get("/profile", auth.requireAuth, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("username email")
    .exec(function(err, user) {
      if (err) return res.json({ success: false, message: err });
      if (!user)
        return res.json({ success: false, message: "UserName not Found" });
      res.json({ success: true, user: user });
    });
});

module.exports = router;
