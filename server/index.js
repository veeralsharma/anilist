const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./middlewares/auth")

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var port = process.env.PORT || 5000;

const mongoURI =
  "mongodb+srv://admin-veeral:veeralsh@cluster0-q4ogi.mongodb.net/anime?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var Users = require("./api/User");
var Animes = require("./api/Anime");
var Review = require("./api/Review");

app.use("/user", Users);
app.use(auth)
app.use("/anime", Animes);
app.use("/review", Review);

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
