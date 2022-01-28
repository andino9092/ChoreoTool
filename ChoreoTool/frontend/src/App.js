import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from "./components/Login";
import './App.css';

export default function App() {
  return (
    <Router>
      
      <Routes>
        <Route path = "/" element={<Login/>}/>
      </Routes>
    </Router>
  )
}