import React from "react";
import "./CompanyCard.css";

function CompanyCard({ company }) {
  return (
    <div className="CompanyCard card card-active mt-3">
      <h5 className="card-header">{company.name}</h5>
      {/* <div className="card-img">
        <img src={company.logoUrl ? company.logoUrl : ""}/>
      </div> */}
      <div className="card-body">
        <p className="card-text"><small>{company.description}</small></p>
        <p className="card-text">Number of employees: {company.numEmployees}</p>
      </div>
    </div>
  )
}

export default CompanyCard;