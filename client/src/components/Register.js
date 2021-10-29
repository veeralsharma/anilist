import React, { useState } from "react";
import { register } from "../Api";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const HandleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: state.username,
      email: state.email,
      password: state.password
    };
    register(newUser).then((res) => {
      history.push("/login");
    });
  };

  return (
    <div className="auth-form">
      <div className="form-heading">Register</div>
      <div className="form-row">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-input"
          name="username"
          placeholder="Enter your user name"
          value={state.username}
          onChange={HandleChange}
        />
      </div>
      <div className="form-row">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-input"
          name="email"
          placeholder="Enter email"
          value={state.email}
          onChange={HandleChange}
        />
      </div>
      <div className="form-row">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          name="password"
          placeholder="Enter password"
          value={state.password}
          onChange={HandleChange}
        />
      </div>
      <div>
        <button className="form-button" type="button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
