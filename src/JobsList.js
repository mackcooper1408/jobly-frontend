import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import "./JobsList.css";

function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(function getJobs() {
    async function jobsApi() {
      const result = await JoblyApi.getAllJobs();
      console.log("------->RESULT", result)
      setJobs(result);
    }
    jobsApi();
  }, []);

  return (
    <div className="JobsList">
      {jobs.map(j => (
        <JobCard key={j.id} job={j}/>
      ))}
    </div>
  )
}

export default JobsList;