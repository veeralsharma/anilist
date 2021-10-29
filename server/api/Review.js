const express = require("express");
const review = express.Router();
const cors = require("cors");
const Review = require("../models/Review");

review.use(cors());

process.env.SECRET_KEY = "secret";

review.get("/test", (req, res) => {
  res.send("working");
});

review.post("/create/", async (req, res) => {
  const reviewData = {
    anime_id: req.body.anime_id,
    rating: req.body.rating,
    description: req.body.description, 
    email: req.body.email,
  };

  Review.create(reviewData)
    .then((review) => {
      res.status(200).json({ message: "created!" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

review.get("/find/:anime_id", async (req, res) => {
    const id = req.params.anime_id
    Review.find({anime_id:id})
    .then((reviews) => {
      res.status(200).json({ message: reviews});
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

review.get("/rating/:anime_id", async (req, res) => {
  const id = req.params.anime_id
  Review.find({anime_id:id})
  .then((reviews) => {
    if(reviews.length ==0){
      res.status(200).json({ message: "no reviews"});
    }
    const total = getSum(reviews)
    const rating = total/reviews.length
    res.status(200).json({ message: rating});
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
});

function getSum(array) {
  let sum ;
  array.forEach((ele) => {
    sum+=ele.rating
  })
  return sum
}

module.exports = review;
