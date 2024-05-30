import React from 'react';
import Sidebar from './Component/Sidebar';
import Topnav from './Component/Topnav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Profile from './Component/Profile/Profile'

function App() {
  return(
  <div className="app-background">
  <Router>
   
    <div className="layout">
      <Sidebar />
      <Topnav />
    </div>
    <Routes>
    <Route 
            exact
            path="/profile"
            element={<Profile />}
          />
          </Routes>
  </Router>
</div>
);
}

export default App;
