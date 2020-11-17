import React from "react";
import gif from "./images/office-space-gif-1.gif";

function Home() {
  return (
    <div className="Home mt-4">
      <h1>Welcome to Jobly!</h1>
      <img src={gif} alt="welcome gif"/>
    </div>
  )
}

export default Home;