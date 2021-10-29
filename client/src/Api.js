import axios from "axios";

const Axios = axios.create({
  baseURL: "https://anilist-veeral.herokuapp.com/"
});

export const register = (newUser) => {
  return Axios.post("user/register", {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password,
    age: newUser.age
  })
    .then((response) => {
      console.log("Registered");
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};

export const login = (user) => {
  return Axios.post("user/login", {
    email: user.email,
    password: user.password
  })
    .then((response) => {
      localStorage.setItem("usertoken", response.data.message);
      return response.data;
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};

export const getAnime = (anime_name, token) => {
  return Axios.get(`anime/search/${anime_name}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};

export const getAnimeDetails = (id, token) => {
  return Axios.get(`anime/details/${id}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};

export const addReview = (data, token) => {
  return Axios.post(`review/create`, data, {
    headers: { Authorization: token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};

export const getReviews = (id, token) => {
  return Axios.get(`review/find/${id}`, {
    headers: { Authorization: token }
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      alert("Something went wrong");
      window.location.reload();
    });
};
