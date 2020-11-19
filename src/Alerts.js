import React from "react";

function Alerts({ alerts }) {
  return (
    <div>
      {alerts.map((a, i) => (
        <div className="alert alert-danger" key={i}>{a}</div>
      ))}
    </div>
  )
}

export default Alerts;