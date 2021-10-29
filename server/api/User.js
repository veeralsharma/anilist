const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.get("/test", (req, res) => {
  res.send("working");
});

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.status(200).json({ message: user.email + "Registered!" });
            })
            .catch((err) => {
              res.status(500).json({message:err});
            });
        });
      } else {
        res.status(500).json({ message: "User already exists" });
      }
    })
    .catch((err) => {
      res.status(500).json({message:err});
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
          };
          let token = jwt.sign(payload, 'secret', {
            expiresIn: 10000000
          });
          res.status(200).json({ message : token });
        } else {
          res.status(500).json({ message: "User does not exist" });
        }
      } else {
        res.status(500).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({message:err});
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  User.findOne({
    _id: decoded._id
  })
    .then((user) => {
      if (user) {
        res.status(200).json({message: user});
      } else {
        res.status(500).json({message: "User does not exist"});
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = users;
