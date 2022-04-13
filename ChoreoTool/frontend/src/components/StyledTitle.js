import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const TitleStyle = styled(TextField)(({
    
    '& label.Mui-focused':{
        color: "white",
    },

    '& label':{
        color: "white",
    },

    '& .MuiInputBase-formControl':{

        borderBottom: "None",

        
        '& .MuiInputBase-input': {
            color: "white",
            textAlign: "center",
            fontSize: "40px",
            letterSpacing: "4px",
        },
        '&::before':{
            borderBottom: "None",
        },
        '&::after':{
            borderBottom: "white solid 2px",
        }
      

    },
    '&.MuiTextField-root':{
        display: "block",
        alignItems: "center",
        textAlign: "center",
    }
}))

export default function StyledTitle(props){
    // variant="standard" name="title" placeholder="Title" value={title} onChange={handleTextField}
    return <TitleStyle
                variant={props.variant}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        
}