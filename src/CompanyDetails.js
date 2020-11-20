import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

import Alerts from "./Alerts";
import userContext from "./userContext";
import JoblyApi from "./api";
import JobCard from "./JobCard";


function CompanyDetails() {
  const [company, setCompany] = useState({ name: "", jobs: [] });
  const [user, setUser] = useState(null);
  const { currentUser, alertMessage } = useContext(userContext);
  const { handle } = useParams();
  let isApplied;
  
  const { name, jobs } = company;
  
  useEffect(() => {
    async function companySearch() {
      try {
        const companyResult = await JoblyApi.getCompany(handle);
        const userResult = await JoblyApi.getUser(currentUser);
        setUser(userResult);
        setCompany(companyResult);
      } catch(err) {
        setCompany({ name: "", jobs: [] });
        alertMessage(err);
      }
    }
    companySearch();
  }, [handle, currentUser])
  
  
  if (!jobs) return <h1>Loading...</h1>

  if (!currentUser) return (<Alerts alerts={["Not Allowed, Please Sign In"]}/>);

  return (
    <div>
      {company.name !== "" ?
        <div>
          <h1 className="mt-4"> {name}</h1>
          <div className="JobsList my-2">
            {jobs.map(j => {
              user.applications.includes(j.id) ? isApplied = true : isApplied = false;
              return <JobCard key={j.id} job={j} isApplied={isApplied} />
            })}
          </div>
        </div > :
        <NotFound />}
    </div>
  )
}

export default CompanyDetails;