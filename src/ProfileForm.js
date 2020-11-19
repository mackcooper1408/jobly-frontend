import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "./api.js";
import userContext from "./userContext"
import Alerts from "./Alerts";

function ProfileForm() {
  const initialState = {
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  // const currentUser = localStorage.getItem("currentUser");
  const { currentUser, update, alertMessage } = useContext(userContext);

  useEffect(() => {
    async function getCurrentUser() {
      const user = await JoblyApi.getUser(currentUser);
      console.log("------>USER", user)
      const { firstName, lastName, email } = user
      setFormData({ firstName, lastName, email, password: "" });
    }
    getCurrentUser();
  }, [currentUser]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await JoblyApi.login({ username: currentUser, password: formData.password })
      update(formData, currentUser)
      history.push("/companies");
    } catch (err) {
      console.log("result???", err);
      alertMessage(err);
      setFormData((fdata) => ({ ...fdata, password: "" }));
    }
  }

  /** Update local state w/curr state of input elem */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  if (!currentUser) return (<Alerts alerts={["NotAllowed"]} />);

  return (
    <form onSubmit={handleSubmit} className="SignupForm my-4 col-8 mx-auto border">
      <h2 className="mt-2">Edit Your Profile</h2>
      <h5 className="mb-4">{currentUser}</h5>
      <div className="form-group col-4">
        <label htmlFor="firstName" className="float-left">First Name</label>
        <input
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="first name" />
      </div>
      <div className="form-group col-4">
        <label htmlFor="lastName" className="float-left">Last Name</label>
        <input
          className="form-control"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="last name" />
      </div>
      <div className="form-group col-4">
        <label htmlFor="email" className="float-left">Email</label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email" />
      </div>
      <div className="col border-top my-4"></div>
      <div className="form-group col-4">
        <label htmlFor="password" className="float-left">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password" />
        <small className="form-text text-muted">Enter your password to confirm your changes.</small>
      </div>
      <button className="btn btn-primary my-2 col-3">Update Profile</button>
    </form >
  )
}

export default ProfileForm;
