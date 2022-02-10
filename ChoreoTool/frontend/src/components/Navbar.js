import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";


export default function Navbar(){

    return(
        <nav class="navbar-expand-lg navbar ">
            <div class="navbar-brand brand">Spotify Staging</div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto align-middle">
                <li class="nav-item active">
                    <a class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <div className="align">
                        <a class="nav-link">Features</a>
                    </div>
                    
                </li>
                <li class="nav-item">
                    <a>
                        <div className="nav-link">
                            Pricing
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <div className="btn">Login</div>
                    
                </li>
                
                </ul>
            </div>
        </nav>
    )
}