import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import JoblyApi from "./api";
import NavBar from './NavBar';
import Routes from './Routes';

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token") || null;
    const localUser = localStorage.getItem("currentUser") || null;
    setToken(localToken);
    setCurrentUser(localUser);
  })


  async function signup(userData) {
    const result = await JoblyApi.signup(userData);
    console.log("TOKEN RESULT--->", result);
    setToken(result);
    setCurrentUser(userData.username);
    localStorage.setItem("token", result);
    localStorage.setItem("currentUser", userData.username);
  }
  
  async function login(userData) {
    const result = await JoblyApi.login(userData);
    console.log("TOKEN RESULT--->", result);
    setToken(result);
    setCurrentUser(userData.username);
    localStorage.setItem("token", result);
    localStorage.setItem("currentUser", userData.username);
  }
  
  function logout() {
    // Goodbye token
    // Goodbye user
    localStorage.clear();
    setToken(null);
    setCurrentUser(null);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser} logout={logout}/>
        <Routes signup={signup} login={login} />
      </BrowserRouter>
    </div>
  );
}



export default App;
