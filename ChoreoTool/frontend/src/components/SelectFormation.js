import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import convertToData from "./ConvertToData";

export default function SelectFormation(props){

    const history = useNavigate();

    const handleClick = () => {
        history('/create', {state: {
            title: props.title,
            formations: convertToData(props.formations),
        }})
    }

    return (
        <Box sx={{my:1, mx:1, padding:"10px", color:"white", fontSize:20}}>
            <div onClick={handleClick}>
                {props.title}
            </div>
        </Box>
    )
}