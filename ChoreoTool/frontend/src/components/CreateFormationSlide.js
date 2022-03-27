import React, {useState, useEffect} from "react";
import { Button, Box, Grid } from "@mui/material";
import Canvas from "./Canvas";
import StyledButton from "./StyledButton";
import ResponsiveSlider from "./ResponsiveSlider";

export default function CreateFormationSlide(props){

    const [pages, setPages] = useState(0);

    // Song informaiton and lyrics(maybe) might be here

    return(
        <div>

            <Canvas isLoggedIn={props.isLoggedIn}/> 
                
         
            
        </div>
    )

}