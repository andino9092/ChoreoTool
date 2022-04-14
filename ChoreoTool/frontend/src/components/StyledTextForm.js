import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { width } from "@mui/system";


export default function StyledTextForm(props){
    // name="y" label="Row" sx={{color:"green", width:"75px", height:"50px", padding:"2px"}}
    
    return <StyledTextField
                onChange={props.onChange}    
                variant={props.variant}
                placeholder={props.placeholder}
                size={props.size}
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    my:props.my,
                    mx:props.mx,
                }}
            >
            </StyledTextField>
}

const StyledTextField = styled(TextField)((({size}) => ({
    '&.MuiTextField-root':{
        '& .MuiFormLabel-colorPrimary':{
            color: "white",
        },
        '& .MuiInputBase-input':{
            color:"white",
            textAlign:"center",
            fontSize: size + "rem",
        },
        '& .Mui-focused input::placeholder':{
            color:"transparent",
        },
        '& .MuiInputBase-formControl':{
            borderBottom:"2px white",
            '& .Mui-focused input::placeholder':{
                color:"transparent",
            },
            '&:hover:not(.Mui-disabled):before':{
                borderBottom:"white solid 2px",
            },
            '&::before':{
                borderBottom:"green solid 2px",
            },
            '&::after':{
                borderBottom: "green solid 2px"
            }
        }
    }
})))