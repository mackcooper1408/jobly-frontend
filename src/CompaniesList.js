import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import "./CompaniesList.css";

import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getCompanies() {
    async function companiesApi() {
      const result = await JoblyApi.getAllCompanies();
      console.log("------->RESULT", result)
      setCompanies(result);
    }
    companiesApi();
  }, []);
  
  return (
    <div className="CompaniesList">
      <SearchForm />
      {companies.map(c => (
        <CompanyCard key={c.handle} company={c}/>
      ))}
    </div>
  )
}

export default CompaniesList;