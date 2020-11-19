import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import userContext from "./userContext";
import JoblyApi from "./api";
import JobCard from "./JobCard";


function CompanyDetails() {
  const [company, setCompany] = useState({ name: "", jobs: [] });
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(userContext);
  const { handle } = useParams();
  let isApplied;

  const { name, jobs } = company;

  useEffect(() => {
    async function companySearch() {
      const companyResult = await JoblyApi.getCompany(handle);
      const userResult = await JoblyApi.getUser(currentUser);
      console.log("result --->", companyResult);
      setUser(userResult);
      setCompany(companyResult);
    }
    companySearch();
  }, [handle, currentUser])

  if (!jobs) return <h1>Loading...</h1>

  return (
    <div>
      {company ?
        <div>
          <h1 className="mt-4"> {name}</h1>
          <div className="JobsList">
            {jobs.map(j => {
              user.applications.includes(j.id) ? isApplied = true : isApplied = false;
              return <JobCard key={j.id} job={j} isApplied={isApplied} />
            })}
          </div>
        </div > :
        null}
    </div>
  )
}

export default CompanyDetails;