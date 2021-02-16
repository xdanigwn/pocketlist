import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LandingPage from 'pages/LandingPage';
import ReportPage from 'pages/ReportPage';
import AccountDetail from 'pages/AccountDetail';
// import SettingsPage from 'pages/SettingsPage';

import "assets/scss/style.scss"

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/report" component={ReportPage}></Route>
        <Route path="/accountdtl/:id_account" component={AccountDetail}></Route>
        {/* <Route path="/settings" component={SettingsPage}></Route> */}
      </Router>
    </div>

  );
}

export default App;