import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function InfoPage(props){
    const history = useNavigate();
    useEffect(() => {
        if (props.status){
            history("/");
        }
    })

    return(
        <Box sx={{my: 30, width:'100%', justifyContent:"center", alignItems:"center"}}>
            <Box sx={{my:3, mx: 3, alignItems:"center", justifyContent:"center", textAlign:"center", fontWeight:"50"}}>
                <h1>
                    Thank you for using Spotify Staging
                </h1>
                <h2>
                    Please log in with your Spotify account to continue
                </h2>
            
            </Box>
        </Box>
    )
}