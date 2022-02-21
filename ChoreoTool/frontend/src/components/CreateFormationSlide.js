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
            <Box sx={{my: 2, mx: 2}}>
                <div style={{display:"flex", justifyContent: "right", marginRight:"25%"}}>
                    <Button onClick={saveFormation}>Save</Button>
                </div>
            </Box>
            
            
            <Canvas/> 
                    
                
         
            
        </div>
    )

}