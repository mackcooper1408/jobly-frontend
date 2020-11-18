import React, { useState } from "react";
import "./JobCard.css";
import NumberFormat from 'react-number-format';


function JobCard({ job }) {
  const [applied, setApplied] = useState(false);

  // useEffect(() => {
  //   async function getApplicationStatus() {

  //     setApplied(result);
  //   }
  //   getApplicationStatus();
  // }, []);

  // async function apply(jobId) {
  //   const result = await JoblyApi.applyToJob(jobId);
  //   console.log("------->RESULT", result)
  //   setApplied(true);
  // }

  // TEMPORARY
  function handleClick() {
    setApplied(true);
  }

  return (
    <div className="JobCard card card-active mt-3">
      <div className="card-body">
        <h6 className="card-text">{job.title}</h6>
        <p className="card-text">{job.companyName ? job.companyName : null}</p>
        {job.salary ?
          <p className="card-text">Salary: <small>
            <NumberFormat
              value={job.salary}
              thousandSeparator={true}
              prefix={'$'}
              displayType={'text'} />
          </small></p> :
          null}
        {job.equity > 0 ?
          <p className="card-text">Equity: <small>
            <NumberFormat
              value={job.equity}
              suffix={'%'}
              displayType={'text'} />
          </small></p> :
          null}
        {applied ?
          <button className="btn btn-block btn-sm btn-secondary" disabled>Applied</button> :
          <button className="btn btn-block btn-sm btn-secondary" onClick={handleClick}>Apply</button>}
      </div>
    </div>
  )
}

export default JobCard;