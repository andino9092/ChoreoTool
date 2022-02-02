import React, { useState } from "react";

export default function Login(){

    const [isLoggedIn, logIn] = useState(false);
    const [data, setData] = useState();

    const handleLogin = async () => {
        fetch("/choreoTool/isAuthenticated")
            .then((response) => response.json())
            .then((data) => {
                logIn(data.status);
                console.log(data.status);
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
        <div>
            <button onClick={handleLogin}>
                Authenticate with Spotify
            </button>
        </div>
    )
}