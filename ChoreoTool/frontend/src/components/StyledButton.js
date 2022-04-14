import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Styled = styled(Button)((({disabled}) => ({
    '&.MuiButtonBase-root':{
        color: "black",
        backgroundColor: "green",
        opacity: disabled ? ".5" : "1",
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
})))


export default function StyledButton(props){
    return <Styled 
                form={props.form} 
                onClick={props.onClick} 
                style={{width: props.width, margin: props.margin, display: props.display}}
                disabled={props.disabled}
            >
        {props.text}
    </Styled>
}