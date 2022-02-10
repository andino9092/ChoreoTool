import React, { useState, useEffect} from "react";

export default function Login(){

    const [isLoggedIn, logIn] = useState(false);
    const [data, setData] = useState();

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

    return (
        <div className="nav-link">
            {isLoggedIn ? "{UserName}" : 
                <a className="" onClick={handleLogin}>
                    Login
                </a>
            }
        </div>
    )
}