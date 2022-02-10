import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function InfoPage(props){
    const history = useNavigate();
    useEffect(() => {
        if (props.status){
            history("/");
        }
    })

    return(
        <div>
            Thank you for using Spotify Staging. Please authenticate with your Spotify account to continue.
        </div>
    )
}