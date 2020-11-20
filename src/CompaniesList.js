import React, { useEffect, useState, useContext } from "react";
import "./CompaniesList.css";

import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { useHistory } from "react-router-dom";
import userContext from "./userContext"
import Alerts from "./Alerts"

// Pagination stuff
import Pagination from "./Pagination";


function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  // Pagination stuff
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  const { currentUser } = useContext(userContext)

  const pageLimit = 7;
  const totalRecords = companies.length;
  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(function getCompanies() {
    async function companiesApi() {
      const result = await JoblyApi.getAllCompanies();
      setCompanies(result);
      // Pagination Stuff
    }
    companiesApi();
  }, []);

  useEffect(() => {
    gotoPage(1);

  }, [companies]);

  // useEffect(function componentDidMount() {
  //   gotoPage(1);
  //   // const currentCompanies = companies.slice(0, 10);
  //   // setCurrentCompanies(currentCompanies);
  // }, [companies]);

  async function search(searchTerm) {
    const result = await JoblyApi.getAllCompanies(searchTerm);
    setCompanies(result);
  }

  function goToDetails(handle) {
    history.push(`/companies/${handle}`);
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
    const currentCompanies = companies.slice(offset, offset + pageLimit);

    setCurrentPage(currentPage);
    setCurrentCompanies(currentCompanies);
    // setTotalPages(totalPages);
  }
  // Pagination stuff end

  if (!currentCompanies) return <h1>Loading...</h1>;

  if (!currentUser) return (<Alerts alerts={["Not Allowed, Please Sign In"]} />);


  return (
    <div className="CompaniesList">
      <SearchForm search={search} />
      {currentCompanies.map(c => (
        <CompanyCard key={c.handle} company={c} details={goToDetails} />
      ))}
      <Pagination totalRecords={totalRecords} onPageChanged={onPageChanged} currentPage={currentPage} gotoPage={gotoPage} totalPages={totalPages} />
    </div>
  )
}

export default CompaniesList;