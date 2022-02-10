import React, { useState, useEffect} from "react";

export default function Login(){

    const [isLoggedIn, logIn] = useState(false);
    const [data, setData] = useState();
    const [hover, toggle] = useState(false);

    useEffect(() => {
        logIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('isLoggedIn', isLoggedIn);
      }, [isLoggedIn]);

    const handleLogin = () => {
        fetch("/choreoTool/isAuthenticated")
            .then((response) => response.json())
            .then((data) => {
                logIn(data.status);
                toggle(false);
                if (!data.status){
                    fetch("/choreoTool/authorize")
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            window.location.replace(data.url);
                            console.log(data)
                        })
                }
            });
      };

    const btn = {
        borderRadius: "40px",
        backgroundColor: hover ? "white" : "green",
        color: "black",
        overflow: "hidden",
        fontSize: "20px",
        border: hover ? "white 5px" : "none",
        transform: hover ? "scale(1.1)" : "none",
        transitionDuration: ".1s",
        cursor: "pointer",
        paddingLeft: "40px",
        paddingRight: "40px",
    }
    const handleHover = () => {
        if (!isLoggedIn){
            toggle(!hover);
        }
    }

    return (
        <div className="nav-link" style={isLoggedIn ? {} : btn} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            {isLoggedIn ? "{UserName}" : 
                <a className="" onClick={handleLogin}>
                    Log In 
                </a>
            }
        </div>
    )
}