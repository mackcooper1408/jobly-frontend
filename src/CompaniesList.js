import React, { useEffect, useState, useContext } from "react";
import "./CompaniesList.css";

import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
import userContext from "./userContext"
import Alerts from "./Alerts"

function CompaniesList() {
  const [companies, setCompanies] = useState(null);
  const history = useHistory();
  const { currentUser } = useContext(userContext)

  useEffect(function getCompanies() {
    async function companiesApi() {
      const result = await JoblyApi.getAllCompanies();
      console.log("------->RESULT", result)
      setCompanies(result);
    }
    companiesApi();
  }, []);

  async function search(searchTerm) {
    const result = await JoblyApi.getAllCompanies(searchTerm);
    console.log("------->RESULT", result)
    setCompanies(result);
  }

  function goToDetails(handle) {
    // evt.preventDefault();
    history.push(`/companies/${handle}`);
  }
  
  if (!companies) return <h1>Loading...</h1>;

  if (!currentUser) return (<Alerts alerts={["NotAllowed"]}/>);
  

  return (
    <div className="CompaniesList">
      <SearchForm search={search} />
      {companies.map(c => (
        <CompanyCard key={c.handle} company={c} details={goToDetails}/>
      ))}
    </div>
  )
}

export default CompaniesList;