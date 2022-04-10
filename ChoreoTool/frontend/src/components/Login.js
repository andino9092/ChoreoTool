import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props){

    const [isLoggedIn, logIn] = useState(JSON.parse(window.localStorage.getItem('isLoggedIn') || false));
    const [displayName, setDisplayName] = useState();
    const history = useNavigate();


    useEffect(() => {
        logIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
    }, []);
    
    useEffect(() => {
        window.localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    
    useEffect( async () => {
        console.log(isLoggedIn);
            await fetch("/choreoTool/isAuthenticated")
            .then((response) => response.json())
            .then((data) => {
                logIn(data.status);
                props.onLogIn(data.status);
                console.log(isLoggedIn);
            });
    }, [isLoggedIn]);
    
    useEffect(async() => {
        if (isLoggedIn){
            await getData();
        }
    }, [isLoggedIn])
    
    const getData = async () => {
        await fetch("choreoTool/getUsers")
            .then(response => response.json())
            .then(data => {
                setDisplayName(data.data.displayName);
            })
    }

    const handleLogin = async () => {
        if (!isLoggedIn){
            await fetch("/choreoTool/authorize")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    window.location.replace(data.url);
                    console.log(data)
                })
        }
    }

    const logOut = async () => {
        await fetch("choreoTool/logout")
            .then(response => response.json)
        props.onLogIn(false);
        logIn(false);
        history("/infoPage");
    }

    return (
        <div>
            {isLoggedIn ? <div id="myBtn" className="nav-link myBtn"  onClick={logOut}>Log Out</div> : <div id="myBtn" className="nav-link myBtn" onClick={handleLogin}>Log In</div>}
        </div>
    )
}