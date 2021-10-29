const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  var token;
  if (req.header("Authorization") || req.header("authorization")) {
    token = req.header("Authorization") || req.header("authorization");
  }
  if (token) {
    const data = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
      async (err, decoded) => {
        if (err) {
          res
            .status(401)
            .send({
              message: "Not authorized to access this resource",
            });
          return;
        } else {
          try {
            const user = await User.findOne({ _id: decoded._id });
            if (!user) {
              res
                .status(401)
                .send({
                  message: "Not authorized to access this resource",
                });
              return;
            } else {
              next();
            }
          } catch (error) {
            res
              .status(401)
              .send({
                mesasge: "Not authorized to access this resource",
              });
            return;
          }
        }
      }
    );
  } else {
    res.status(401).send({ message: "Not authorized to access this resource" });
    return;
  }
};

module.exports = auth;
