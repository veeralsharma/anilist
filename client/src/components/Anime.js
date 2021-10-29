import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { addReview, getAnimeDetails, getReviews } from "../Api";
import jwt_decode from "jwt-decode";

function Anime() {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [userrating, setUserrating] = useState(1);
  const [usermessage, setUserMessage] = useState("");

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("usertoken");

    const anime = await getAnimeDetails(id, token);
    setDetails(anime);
  }, [id]);

  const getAnimeReviews = useCallback(async () => {
    const token = localStorage.getItem("usertoken");
    const res = await getReviews(id, token);
    console.log(res);
    setReviews(res.message);
  }, [id]);

  useEffect(() => {
    fetchData();
    getAnimeReviews();
  }, [fetchData, getAnimeReviews]);

  async function createReview() {
    const token = localStorage.getItem("usertoken");
    const decoded = jwt_decode(token);
    const data = {
      anime_id: id,
      rating: userrating,
      description: usermessage,
      email: decoded.email
    };
    addReview(data, token).then((res) => {
      setUserMessage("");
      setUserrating(1);
      setReviews([...reviews, data]);
    });
  }

  return (
    <div className="anime">
      {details && (
        <div className="details">
          <h1 className="details-heading">{details.titles.en}</h1>
          <img className="details-banner" src={details.banner_image} />
          <h3>Description</h3>
          <p>{details.descriptions.en || "no description"}</p>
          <h3>Genre</h3>
          <h3>{details.genres.join(" ,")}</h3>
          <div className="details-extra">
            <div className="details-extra-info">
              Episode : {details.episodes_count}
            </div>
            <div className="details-extra-info">
              year : {details.season_year}
            </div>
          </div>
        </div>
      )}
      <div className="review">
        <h2>Reviews and Ratings</h2>
        <h3>user reviews</h3>
        <div className="review-container">
          {reviews &&
            reviews.map((r, index) => {
              return (
                <div key={index} className="review-item">
                  <div>Rating : {r.rating}</div>
                  <div>Message: {r.description}</div>
                  <div>By: {r.email || "Anonymous"}</div>
                </div>
              );
            })}
        </div>
        <h3>Add review</h3>
        <div className="add-review">
          <div className="add-review-rating">
            Rating :
            <select
              onChange={(e) => {
                setUserrating(e.target.value);
              }}
              value={userrating}
              className="add-review-input"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="add-review-rating">
            Message:
            <input
              className="add-review-input--text"
              type="text"
              onChange={(e) => {
                setUserMessage(e.target.value);
              }}
              value={usermessage}
              placeholder="message here"
            />
          </div>
          <button onClick={createReview} className="add-review-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Anime;
