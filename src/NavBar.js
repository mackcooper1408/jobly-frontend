import React from "react";
import { NavLink, useHistory } from 'react-router-dom';
import "./NavBar.css";

function NavBar({ currentUser, logout }) {
  const history = useHistory();

  function handleClick() {
    logout();
    history.push("/");
  }

  if (currentUser) {
    return (
      <nav className="NavBar navbar navbar-light bg-light">
        <NavLink className="navbar-brand" exact to="/">Jobly</NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/companies">Companies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/jobs">Jobs</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/profile">{currentUser}</NavLink>
          </li>
          <li className="nav-item">
            <button onClick={handleClick} className="btn btn-sm btn-primary">Log Out</button>
          </li>
        </ul>
      </nav>
    );

  } else {
    return (
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" exact to="/">Jobly</NavLink>
        <ul className="NavBar-anon navbar-nav">
          <li className="nav-item">
            <NavLink className="btn btn-sm btn-primary" exact to="/signup">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="btn btn-sm btn-secondary" exact to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;