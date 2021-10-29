const express = require('express');
const axios = require('axios')
const anime = express.Router();
const cors = require('cors');

anime.use(cors());

process.env.SECRET_KEY = 'secret'

anime.get('/test', (req,res) =>{
  res.send("working")
})

anime.get('/search/:anime_name', async (req,res) => {
  const anime_name = req.params['anime_name']
  axios.get(`https://api.aniapi.com/v1/anime?title=${anime_name}`)
  .then((data) => {
    res.status(200).json(data.data.data)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({message:"Internal Server Error"})
  })
})

anime.get('/details/:id', async (req,res) => {
  const anime_id = req.params['id']
  axios.get(`https://api.aniapi.com/v1/anime?anilist_id=${anime_id}`)
  .then((data) => {
    res.status(200).json(data.data.data.documents[0])
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({message:"Internal Server Error"})
  })
})


module.exports = anime