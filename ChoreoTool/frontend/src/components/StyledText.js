import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const StyledTextField = styled(TextField)(({
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
            borderColor: "white",
        },
        
        '& .MuiInputBase-input': {
            color: "white"
        },
      

    },

    
}))


export default function StyledText(props){
    // name="y" label="Row" sx={{color:"green", width:"75px", height:"50px", padding:"2px"}}
    return <StyledTextField 
            label={props.label} 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            sx={{color:props.color, 
                width:props.width, 
                height:props.height, 
                padding:props.padding}}
            >
            </StyledTextField>
}