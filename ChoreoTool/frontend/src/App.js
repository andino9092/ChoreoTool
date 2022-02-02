import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from "./components/Login";
import User from "./components/User";
import './App.css';
import React, {useState, useEffect} from 'react'

export default function App() {
  const [isLoggedIn, logIn] = useState(false);

  useEffect(() => {
    fetch("/choreoTool/isAuthenticated")
    .then((response) => response.json())
    .then((data) => {
        logIn(data.status);
        console.log(data.status);
    });
  });

  return (
    <Router>
      
      <Routes>
        
        <Route path = "/Login" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </Router>
  )
}