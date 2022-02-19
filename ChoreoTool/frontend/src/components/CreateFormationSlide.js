import React, {useState, useEffect} from "react";
import { Button, Box, Grid } from "@mui/material";
import Canvas from "./Canvas";

export default function CreateFormationSlide(props){


    const saveFormation = () => {
        fetch("choreoTool/formations/", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                data: "<.[1, 2],[0, 0],[2, 3].,.[0,0].>"
            })
        })
        .then(request => request.json())
        .then(data => {
            console.log(data);
        })
        .catch(errors => console.log(errors))
    }



    return(
        <div>
            <Box sx={{my: 5}}>
                <Grid alignItems='center' justifyContent="center">
                    <Grid item>
                       <Canvas/> 
                    </Grid>
                </Grid>
            </Box>
            <Button onClick={saveFormation}>Save</Button>
        </div>
    )

}