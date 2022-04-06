import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import convertToData from "./ConvertToData";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import StyledDivider from "./StyledDivider";

const StyledBox = styled(Box)(({
    '&.MuiBox-root':{
        '&:hover':{
            color:"black",
            backgroundColor:"white",
            cursor:"pointer",
        },
        '& .MuiGrid-root':{
            '& svg:hover':{
                color:"red",
            }
        }
    },

}))

export default function SelectFormation(props){

    const history = useNavigate();

    const handleClick = async (e) => {
        if (e.target.getAttribute('name') == "redirect"){
            history('/create', {state: {
                id: props.id,
                title: props.title,
                formations: convertToData(props.formations),
            }})
        }
    }

    const handleDelete = async (e) => {
        await fetch('choreoTool/formations', {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: props.id,
            })
        })
            .then(response => response.json)
        history('/');
    }

    return (
        <StyledBox sx={{ color:"white", fontSize:20}}>
            <Grid container sx={{padding:"20px", ml:"1%"}} direction="row" name="redirect" onClick={handleClick}>

                    {props.title}
                
                <Grid item sx={{ml:"auto", mr:"0"}}>
                    <div>
                        <DeleteIcon onClick={handleDelete}/>
                    </div>
                </Grid>
            </Grid>
            {props.divider ? <StyledDivider key={12} borderTop="white solid 1px"/> : ""}
        </StyledBox>
    )
}