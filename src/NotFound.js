import React from "react";
import gif from "./images/confused_puppy.gif";


function NotFound() {
  return (
    <div className="my-4">
      <h1>404 Page Not Found...</h1>
      <img src={gif}></img>
    </div>
  )
}

export default NotFound;