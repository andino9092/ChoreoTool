import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import convertToData from "./ConvertToData";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({
    '&.MuiBox-root':{
        '&:hover':{
            color:"black",
            backgroundColor:"white",
        },
    },

}))

export default function SelectFormation(props){

    const history = useNavigate();

    const handleClick = () => {
        history('/create', {state: {
            id: props.id,
            title: props.title,
            formations: convertToData(props.formations),
        }})
    }

    return (
        <StyledBox sx={{padding:"20px", paddingLeft:"10px", color:"white", fontSize:20}}>
            <a className="selectFormations" onClick={handleClick}>
                {props.title}
            </a>
        </StyledBox>
    )
}