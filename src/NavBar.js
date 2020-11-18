import React from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

function NavBar(props) {
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
          <NavLink className="btn btn-sm btn-primary" exact to="/signup">Sign Up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="btn btn-sm btn-primary" exact to="/profile">Edit Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;