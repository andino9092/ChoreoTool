import React, { useState, useEffect} from "react";

export default function Login(props){

    const [isLoggedIn, logIn] = useState(JSON.parse(window.localStorage.getItem('isLoggedIn') || false));
    const [displayName, setDisplayName] = useState();
    const [hover, toggle] = useState(false);

    useEffect(async() => {
        if (!displayName){
            await getData();
        }
    })
    
    const getData = async () => {
        fetch("choreoTool/getUsers")
            .then(response => response.json())
            .then(data => {
                setDisplayName(data.data.displayName);
            })
    }

    useEffect(() => {
        fetch("/choreoTool/isAuthenticated")
            .then((response) => response.json())
            .then((data) => {
                logIn(data.status);
                toggle(false);
                props.onLogIn(data.status);
                console.log(isLoggedIn);
            });
      }, [isLoggedIn]);
      
    
    useEffect(() => {
        logIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = () => {
        if (!isLoggedIn){
            fetch("/choreoTool/authorize")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    window.location.replace(data.url);
                    console.log(data)
                })
        }
    }

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
        <div>
            {isLoggedIn ? <div className="nav-link">{displayName}</div> : <div className="nav-link" style={btn} onMouseEnter={handleHover}
            onMouseLeave={handleHover} onClick={handleLogin}>Log In</div>}
        </div>
    )
}