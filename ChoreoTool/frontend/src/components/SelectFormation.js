import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import convertToData from "./ConvertToData";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';

const StyledBox = styled(Box)(({
    '&.MuiBox-root':{
        '&:hover':{
            color:"black",
            backgroundColor:"white",
            cursor:"pointer",
        },
        '& .MuiGrid-root':{
            '& div:hover':{
                color:"red",
            }
        }
    },

}))

export default function SelectFormation(props){

    const history = useNavigate();

    const handleClick = async (e) => {
        console.log(e.target.getAttribute('name'));
        if (e.target.getAttribute('name') == "redirect"){
            history('/create', {state: {
                id: props.id,
                title: props.title,
                formations: convertToData(props.formations),
            }})
        }
    }

    const handleDelete = async (e) => {
        console.log(e.target.getAttribute('name'));
        if (e.target.getAttribute('name') == "delete"){
            console.log("ran twice")
            // await fetch('choreoTool/formations', {
            //     credentials: "include",
            //     method: "DELETE",
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         id: props.id,
            //     })
            // })
            //     .then(response => response.json)
            // history('/');
        }
    }

    return (
        <StyledBox sx={{padding:"20px", paddingLeft:"10px", color:"white", fontSize:20}} name="redirect" onClick={handleClick}>
            <Grid container direction="row">
                <Grid item>
                    {props.title}
                </Grid>
                <Grid item sx={{ml:"auto", mr:"0"}}>
                    <div name="delete" onClick={handleDelete}>
                            <DeleteIcon/>
                    </div>
                </Grid>
            </Grid>
        </StyledBox>
    )
}