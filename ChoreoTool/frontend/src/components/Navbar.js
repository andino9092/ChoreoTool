import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


export default function Navbar(props){

    return(
        <nav className="navbar-expand-lg navbar ">
            <div className="navbar-brand brand">Spotify Staging</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto align-middle">
                <li className="nav-item active">
                    <div className="nav-link">
                        <Link to="/">
                            Home
                        </Link>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link">
                        <Link to="/create">
                            Create Formation
                        </Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Login onLogIn={props.onLogIn}/>
                </li>
                
                </ul>
            </div>
        </nav>
    )
}