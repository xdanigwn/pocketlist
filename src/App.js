import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from 'pages/LoginPage';
import LandingPage from 'pages/LandingPage';
import ReportPage from 'pages/ReportPage';
import AccDetailPage from 'pages/AccDetailPage';
import IncDetailPage from 'pages/IncDetailPage';
import ExpDetailPage from 'pages/ExpDetailPage';

import { AuthContextProvider } from "context/AuthContext";
// import axios from "axios";

// import SettingsPage from 'pages/SettingsPage';
import "assets/scss/style.scss"

// axios.defaults.withCredentials = true // SET TO ALLOW COOKIES SENT TO FRONT END BY SERVER 

function App() {
  
  return (
    
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Route exact path="/" component={LoginPage} ></Route>
          <Route path="/landingpage" component={LandingPage} ></Route>
          <Route path="/report" component={ReportPage}></Route>
          <Route path="/personalincdtl/:id/:dateFrom/:dateTo" component={IncDetailPage}></Route>
          <Route path="/personalexpdtl/:id/:dateFrom/:dateTo" component={ExpDetailPage}></Route>
          <Route path="/accountdtl/:id_account" component={AccDetailPage}></Route>
          
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;