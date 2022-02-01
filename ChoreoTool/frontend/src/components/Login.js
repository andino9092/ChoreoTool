import React, { useState } from "react";

export default function Login(){

    const [isLoggedIn, logIn] = useState(false);
    const [data, setData] = useState();

    const handleLogin = () => {
        fetch("/choreoTool/isAuthenticated")
            .then((response) => response.json())
            .then((data) => {
                logIn(data.status);
                console.log(data.status);
                if (!data.status){
                    fetch("/choreoTool/authorize")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        })
                }
            });
        fetch("/choreoTool/getData")
            .then((response) => response.json())
            .then((data) => {
                setData(data.user);
                console.log(data.user);
            });
      };

    return (
        <div>
            <button onClick={handleLogin}>
                Authenticate with Spotify
            </button>
        </div>
    )
}