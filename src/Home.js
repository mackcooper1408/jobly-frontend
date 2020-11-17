import React from "react";
import gif from "./images/office-space-gif-1.gif";

function Home(props) {
  return (
    <div className="Home">
      <h1>Welcome to Jobly!</h1>
      <img src={gif} alt="welcome gif"/>
    </div>
  )
}

export default Home;