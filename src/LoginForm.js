import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "./userContext";

function LoginForm() {
  const initialState = {username: "", password: ""};
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const { login } = useContext(userContext);

  async function handleSubmit(evt) {
    evt.preventDefault();
    await login(formData);
    history.push("/companies");
  }

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }
  
  return (
    <form onSubmit={handleSubmit} className="SignupForm mt-4">
      <h2>Login</h2>
      <div className="form-group form-inline">
        {/* <label htmlFor="username">Username</label> */}
        <input
          className="form-control mx-2"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username" />
      </div>
      <div className="form-group form-inline">
        {/* <label htmlFor="password">Password</label> */}
        <input
          className="form-control mx-2"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password" />
      </div>
      <button className="btn btn-primary mt-2">Login</button>
    </form >
  )
}

export default LoginForm;