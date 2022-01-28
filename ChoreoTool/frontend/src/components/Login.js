import React, { useState } from "react";

export default function Login(){

    const [isLoggedIn, logIn] = useState(false);
    const [data, setData] = useState();

    const handleLogin = () => {
        fetch("choreoTool/authorize/")
            .then((response) => response.json())
            .then((data) => {
               window.location.replace(data.url);
            })

    }

    return (
        <div>
            <button onClick={handleLogin}>
                Authenticate with Spotify
            </button>
        </div>
    )
}