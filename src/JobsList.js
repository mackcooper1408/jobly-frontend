import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import userContext from "./userContext";
import "./JobsList.css";
import Alerts from "./Alerts";
import Pagination from "./Pagination";

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  // Pagination Stuff
  const [currentJobs, setCurrentJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { currentUser } = useContext(userContext);

  let isApplied;

  // Pagination Stuff
  const pageLimit = 10;
  const totalRecords = jobs.length;
  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(function getJobs() {
    async function jobsApi() {
      const jobsResult = await JoblyApi.getAllJobs();
      const userResult = await JoblyApi.getUser(currentUser);
      setUser(userResult);
      setJobs(jobsResult);
    }
    jobsApi();
  }, [currentUser]);

  useEffect(() => {
    gotoPage(1);
  }, [jobs]);

  async function search(searchTerm) {
    const result = await JoblyApi.getAllJobs(searchTerm);
    setJobs(result);
  }

  // Pagination Stuff
  function gotoPage(page) {
    // onPageChanged(f => f);
    const currentPage = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords
    };

    onPageChanged(paginationData);
  }

  function onPageChanged(data) {
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentJobs = jobs.slice(offset, offset + pageLimit);

    setCurrentPage(currentPage);
    setCurrentJobs(currentJobs);
    // setTotalPages(totalPages);
  }
  // Pagination stuff end
  
  if (!currentUser) return (<Alerts alerts={["Not Allowed, Please Sign In"]}/>);


  if (!jobs) return <h1>Loading...</h1>

  return (
    <div className="JobsList">
      <SearchForm search={search}/>
      {currentJobs.map(j => {
        user.applications.includes(j.id) ? isApplied = true : isApplied = false;
        return <JobCard key={j.id} job={j} isApplied={isApplied} />
      })}
      <Pagination totalRecords={totalRecords} onPageChanged={onPageChanged} currentPage={currentPage} gotoPage={gotoPage} totalPages={totalPages} />
    </div>
  )
}

export default JobsList;