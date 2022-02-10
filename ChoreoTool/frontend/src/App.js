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
import {useNavigate, Navigate} from 'react-router-dom';
import InfoPage from './components/InfoPage';

export default function App() {
  const [isLoggedIn, logIn] = useState(JSON.parse(window.localStorage.getItem('isLoggedIn') || false));

  const handleFirstPage = (status) => {
    logIn(status);
  }

  console.log(isLoggedIn);
  return (
    <div className="spotify">
      <Router >
      <Navbar onLogIn={handleFirstPage}/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate replace to="dashboard"/> : <Navigate replace to="infoPage"/>}/>
        <Route path="/infoPage" element={<InfoPage status={isLoggedIn}/>}/>
        <Route path="/dashboard" element={<Dashboard status={isLoggedIn}/>}/>
        <Route path="/create" element={<CreateFormationSlide/>}/>
      </Routes>
    </Router>
    </div>
  )
}