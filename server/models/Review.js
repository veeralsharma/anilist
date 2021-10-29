  
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  anime_id: {
    type: Number
  },
  email:{
    type:String
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})


module.exports = Review = mongoose.model('reviews', ReviewSchema)