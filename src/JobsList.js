import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import userContext from "./userContext";
import "./JobsList.css";
import Alerts from "./Alerts"

function JobsList() {
  const [jobs, setJobs] = useState(null);
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(userContext);
  let isApplied;

  useEffect(function getJobs() {
    async function jobsApi() {
      const jobsResult = await JoblyApi.getAllJobs();
      const userResult = await JoblyApi.getUser(currentUser);
      console.log("------->RESULT", jobsResult);
      setUser(userResult);
      setJobs(jobsResult);
    }
    jobsApi();
  }, [currentUser]);

  async function search(searchTerm) {
    const result = await JoblyApi.getAllJobs(searchTerm);
    console.log("------->RESULT", result)
    setJobs(result);
  }

  if (!currentUser) return (<Alerts alerts={["Not Allowed, Please Sign In"]}/>);


  if (!jobs) return <h1>Loading...</h1>

  return (
    <div className="JobsList">
      <SearchForm search={search}/>
      {jobs.map(j => {
        user.applications.includes(j.id) ? isApplied = true : isApplied = false;
        return <JobCard key={j.id} job={j} isApplied={isApplied} />
      })}
    </div>
  )
}

export default JobsList;




  // const LoadingIndicator = props => {
  //   const { promiseInProgress } = usePromiseTracker();
  //   + import { trackPromise } from 'react-promise-tracker';
  
  //   +   trackPromise(
  //     userAPI.fetchUsers()
  //       .then((users) => {
  //         this.setState({
  //           users,
  //         })
  // -      });
  // +      }));
  
  
  //   return promiseInProgress && 
  // -        <h1>Hey some async call in progress ! </h1>;
  // +    <div
  // +      style={{
  // +        width: "100%",
  // +        height: "100",
  // +        display: "flex",
  // +        justifyContent: "center",
  // +        alignItems: "center"
  // +      }}
  // +    >
  // +      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
  // +    </div>
  // };