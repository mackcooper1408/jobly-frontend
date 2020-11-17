import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";


function CompanyDetails() {
  const [company, setCompany] = useState({ name: "", jobs: []});
  const { handle } = useParams();

  const {name, jobs} = company;

  useEffect(() => {
    async function companySearch() {
      const result = await JoblyApi.getCompany(handle);
      console.log("result --->", result);
      setCompany(result);
    }
    companySearch();
  }, [handle])

  return (
    <div>
      {company ?
        <div>
          <h1 className = "mt-4"> {name}</h1>
          <div className="JobsList">
            {jobs.map(j => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div > :
        null}
    </div>
  )
}

export default CompanyDetails;