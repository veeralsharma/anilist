import React, { useState } from "react";
import { login } from "../Api";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [state, setState] = useState({
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
    const data = {
      email: state.email,
      password: state.password
    };
    login(data).then((res) => {
      history.push("/home");
    });
  };

  return (
    <div className="auth-form">
      <div className="form-heading">Login</div>
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

export default Login;
