import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";


// { username, password, firstName, lastName, email }
function SignupForm({ signup }) {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
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
      <h2>Sign Up</h2>
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
      <div className="form-group form-inline">
        {/* <label htmlFor="firstName">First Name</label> */}
        <input
          className="form-control mx-2"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="first name" />
      </div>
      <div className="form-group form-inline">
        {/* <label htmlFor="lastName">Last Name</label> */}
        <input
          className="form-control mx-2"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="last name" />
      </div>
      <div className="form-group form-inline">
        {/* <label htmlFor="email">Email</label> */}
        <input
          className="form-control mx-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email" />
      </div>
      <button className="btn btn-primary mt-2">Sign up</button>
    </form >
  )
}

export default SignupForm;