import React from "react";
import { styled } from "@mui/material/styles";
import { Button, alpha} from "@mui/material";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({theme}) => ({
    '& label.Mui-focused':{
        color: "white",
    },

    '& label':{
        color: "white",
    },

    '& .MuiOutlinedInput-root':{

        '&:hover fieldset':{
            borderColor: "white",
        },
        '&.Mui-focused fieldset':{
            borderColor: "white",
        },
        '& fieldset':{
            borderColor: "yellow",
        },
        
        '& .MuiInputBase-input': {
            color: "white"
        },
      

    },

    
}))


export default function Test(props){
    return <StyledTextField label={props.x}></StyledTextField>
}