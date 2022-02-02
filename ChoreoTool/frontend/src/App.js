import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css';
import React, {useState, useEffect} from 'react'
import {useNavigate, Navigate} from 'react-router-dom';

export default function App() {
  const [isLoggedIn, logIn] = useState(false);

  useEffect(() => {
    fetch("/choreoTool/isAuthenticated")
      .then((response) => response.json())
      .then((data) => {
          logIn(data.status);
          console.log(data.status);
      });
  })


  return (
    <Router>
      {isLoggedIn ? <Navigate to="/dashboard"/> : ""}
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}