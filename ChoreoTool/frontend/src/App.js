import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from './components/Navbar';
import CreateFormationSlide from './components/CreateFormationSlide'
import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom';
import InfoPage from './components/InfoPage';

export default function App() {
  const [isLoggedIn, logIn] = useState(JSON.parse(window.localStorage.getItem('isLoggedIn') || false));

  const handleFirstPage = (status) => {
    logIn(status);
  }

  console.log(isLoggedIn);
  return (
    <div className="spotify">
        <Router>
          <Navbar onLogIn={handleFirstPage}/>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate replace to="dashboard"/> : <Navigate replace to="infoPage"/>}/>
            <Route path="/infoPage" element={<InfoPage status={isLoggedIn}/>}/>
            <Route path="/dashboard" element={<Dashboard status={isLoggedIn}/>}/>
            <Route path="/create" element={<CreateFormationSlide status={isLoggedIn}/>}/>
          </Routes>
      </Router>
      <div className="footer">
            <ul className="icons">
              {/* Add links */}
               <li className="icons"><a><i className="fa fa-github"></i></a></li>
               <li className="icons"><a><i className="fa fa-linkedin"></i></a></li>
               <li className="icons"><a><i className="fa fa-spotify"></i></a></li>
            </ul>
          </div>
    </div>
  )
}


// Look into hot reloading