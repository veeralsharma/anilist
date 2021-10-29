import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnime } from "../Api";

function Home() {
  const [search, setSearch] = useState("");

  const [animes, setAnimes] = useState([]);

  const fetchAnime = useCallback(async () => {
    const token = localStorage.getItem("usertoken");
    const res = await getAnime(search, token);
    const list = res.documents.slice(0, 10);
    setAnimes(list);
  }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");

    if(!token){
      window.location.href="/"
    }
  })

  const getCurrentRating = useCallback(() => {
    return 4;   
  })

  return (
    <div className="home">
      <div className="home-heading">
        Search your favourite Anime content online
      </div>
      <input
        className="home-search"
        type="text"
        value={search}
        placeholder="enter Anime name"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="search-button" type="button" onClick={fetchAnime}>
        Search
      </button>
      <div className="search-result">
        {animes.map((anime) => (
          <div key={anime.anilist_id} className="anime-card">
            <img src={anime.banner_image} className="anime-card-image" />
            <h2>{anime.titles.en}</h2>
            <div><b>description</b> :
                <div>
                    {anime.descriptions.en.substring(0,150)} ...
                </div>
            </div>
            <div><b>Genres</b>: {anime.genres.splice(0,4).join(" ,")}</div>
            <div><b>Current Rating</b>: {getCurrentRating(anime.anilist_id)}</div>
            <div><b>Season Year</b>: {anime.season_year}</div>
            <div><b>Episodes</b>: {anime.episodes_count}</div>
            <div><Link to={`/anime/${anime.anilist_id}`} >Know more </Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
