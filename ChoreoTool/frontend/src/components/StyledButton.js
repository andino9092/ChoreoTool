import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Styled = styled(Button)(({
    '&.MuiButtonBase-root':{
        color: "black",
        backgroundColor: "green",
        borderRadius: "40px",
        '&:hover':{
            backgroundColor: "white",
            transform: "scale(1.1)",
            transitionDuration: ".1s"
        },
        '&:focus':{
            outline:"None",
        }
    }
}))


export default function StyledButton(props){
    return <Styled form={props.form} onClick={props.onClick} style={{width: props.width, margin: props.margin, display: props.display}}>
        {props.text}
    </Styled>
}