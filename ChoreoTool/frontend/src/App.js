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

export default function App() {

  return (
    <div className="spotify">
      <Router >
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/create" element={<CreateFormationSlide/>}/>
      </Routes>
    </Router>
    </div>
  )
}