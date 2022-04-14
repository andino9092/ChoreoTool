import { Scale } from "@mui/icons-material";
import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group"
import Canvas from "./Canvas";
import StyledButton from "./StyledButton";
import { Box } from "@mui/material";
import ListCompressor from "./ListCompressor";
import StyledTextForm from "./StyledTextForm";
import "./style.css"

export default function CreateFormationSlide(props){

    const [pages, setPages] = useState(0);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [numppl, setNumPpl] = useState(0);

    // Song informaiton and lyrics(maybe) might be here

    const handleTextField = (e) => {
        console.log(e.target.type)
        if (e.target.type === 'text' && e.target.value){
            setNumPpl(parseInt(e.target.value));
        }
        else{
            setNumPpl(0);
        }
    }

    useEffect(() => {
        console.log(numppl);
        console.log(Array(numppl).fill(0).length);
    },[numppl])

    return(
        <div>
            {showButton && (
                <Box sx={{my: 2, mx:1, justifyContent: "center", alignItems:"center"}} bottom="0px">
                    <StyledTextForm variant="standard" size="2" placeholder="# of Performers" onChange={handleTextField} value={numppl == 0 ? "" : numppl}/>
                    <Box>
                        <ListCompressor type="StyledTextForm" numppl={numppl}/>
                    </Box>
                    <div style={{display:"flex", justifyContent: "right", marginRight:"18.75%"}}>
                        <StyledButton onClick={() => {setShowCanvas(true)}} text="Continue" width="10%"></StyledButton>
                    </div>
                </Box>
            )}
            <div>
                <CSSTransition 
                    in={showCanvas} 
                    timeout={1000}
                    classNames="canvas"
                    unmountOnExit
                    onEnter={() => setShowButton(false)}
                    onExited={() => setShowButton(true)}
                    >
                        <div>
                            <Canvas isLoggedIn={props.isLoggedIn}/>
                        </div>
                </CSSTransition>
            </div>
        </div>
    )

}