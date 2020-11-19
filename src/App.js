import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import userContext from "./userContext";

import JoblyApi from "./api";
import NavBar from './NavBar';
import Alerts from './Alerts';
import Routes from './Routes';

function App() {
  // const [token, setToken] = useState(null);
  const localUser = localStorage.getItem("currentUser") || null;
  const [currentUser, setCurrentUser] = useState(localUser);
  const [alerts, setAlerts] = useState(null);

  // useEffect(() => {
  //   // const localToken = localStorage.getItem("token") || null;
  //   // setToken(localToken);
  //   setCurrentUser(localUser);
  // }, []);


  async function signup(userData) {
    try {
      const result = await JoblyApi.signup(userData);
      // setToken(result);
      setCurrentUser(userData.username);
      localStorage.setItem("token", result);
      localStorage.setItem("currentUser", userData.username);
    } catch (err) {
      alertMessage(err);
    }
  }

  async function login(userData) {
    try {
      const result = await JoblyApi.login(userData);
      // setToken(result);
      localStorage.setItem("currentUser", userData.username);
      localStorage.setItem("token", result);
      setCurrentUser(userData.username);
    } catch (err) {
      alertMessage(err);
    }
  }

  function logout() {
    // Goodbye token
    // Goodbye user
    localStorage.clear();
    // setToken(null);
    setCurrentUser(null);
  }

  async function apply(username, jobId) {
    const result = await JoblyApi.applyToJob(username, jobId);
    console.log("------->RESULT", result);
  }

  function alertMessage(msgs) {
    setAlerts(msgs);
    setTimeout(() => {
      setAlerts(null);
    }, 3000);
  }

  async function update(userData, username) {
    await JoblyApi.updateUser(userData, username);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ currentUser, signup, login, logout, update, alertMessage, apply }}>
          <NavBar />
          {alerts && <Alerts alerts={alerts} />}
          <Routes />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}



export default App;
