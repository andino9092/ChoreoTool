import React, {useState, useEffect} from "react";
import { Button, Box, Grid } from "@mui/material";
import Canvas from "./Canvas";
import StyledButton from "./StyledButton";

export default function CreateFormationSlide(props){

    const [pages, setPages] = useState(0);

    // Song informaiton and lyrics(maybe) might be here

    const getSlideData = () => {
        
    }

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
            
            
            
            <Canvas/> 
                    
                
         
            
        </div>
    )

}