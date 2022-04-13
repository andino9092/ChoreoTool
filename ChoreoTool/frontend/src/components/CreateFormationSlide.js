import { Scale } from "@mui/icons-material";
import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group"
import Canvas from "./Canvas";
import StyledButton from "./StyledButton";
import { Box } from "@mui/material";
import StyledText from "./StyledText";
import StyledTitle from "./StyledTitle";


export default function CreateFormationSlide(props){

    const [pages, setPages] = useState(0);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [numppl, setNumPpl] = useState(0);

    // Song informaiton and lyrics(maybe) might be here

    const handleTextField = (e) => {
        setNumPpl(e.target.value);
    }

    return(
        <div>
            {showButton && (
                <Box sx={{my: 2, justifyContent: "center", alignItems:"center", display:"flex"}}>
                    <StyledTitle variant="standard" placeholder="# of Performers" onChange={handleTextField}/>
                    <StyledButton onClick={() => setShowCanvas(true)} text="Click to Enter"/>
                </Box>
            )}
            <div>
                <CSSTransition 
                    in={showCanvas} 
                    timeout={300}
                    classNames="my-node"
                    unmountOnExit
                    onEnter={() => setShowButton(false)}
                    onExited={() => setShowButton(true)}
                    >
                        <div>
                            {/* <StyledButton onClick={() => setShowCanvas(false)} text="Close"/> */}
                            <Canvas isLoggedIn={props.isLoggedIn}/>
                        </div>
                </CSSTransition>
            </div>
        </div>
    )

}