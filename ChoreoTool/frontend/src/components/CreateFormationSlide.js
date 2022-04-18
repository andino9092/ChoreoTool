import React, {useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group"
import Canvas from "./Canvas";
import StyledButton from "./StyledButton";
import { Box, Grid, Step} from "@mui/material";
import ListCompressor from "./ListCompressor";
import StyledTextForm from "./StyledTextForm";
import "./style.css"

const steps = ["Number of Performers", "Names and Colors"]

export default function CreateFormationSlide(props){

    const [pages, setPages] = useState(0);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [error, setError] = useState(false);
    const [numppl, setNumPpl] = useState(0);
    const [names, setNames] = useState([]);

    // Song informaiton and lyrics(maybe) might be here

    const handleTextField = (e) => {
        console.log(e.target.value == "")
        console.log(parseInt(e.target.value))
        if (e.target.type === 'text' && e.target.value && !isNaN(parseInt(e.target.value))){
            setNumPpl(parseInt(e.target.value));
            setError(false);
        }
        else{
            setNumPpl(0);
        }
        if (isNaN(parseInt(e.target.value))){
            if (e.target.value == ""){
                setError(false);
                return;
            }
            setError(true);
        }
    }

    const handleNames = (names) => {
        setNames(names);
    }

    const renderCanvas = () => {
        return (
            <Canvas isLoggedIn={props.isLoggedIn} names={names}/>
        )
    }

    useEffect(() => {
        console.log(numppl);
        console.log(Array(numppl).fill(0).length);
    },[numppl])

    return(
        <div className="wrapper">
            {showButton && <CSSTransition
                    in={showButton}
                    timeout={1000}
                    classNames="formationForm"
                    unmountOnExit
                >
                    <Box sx={{my: 2, mx:1, justifyContent: "center", alignItems:"center"}} bottom="0px">
                        <StyledTextForm error={error} variant="standard" size="2" placeholder="# of Performers" onChange={handleTextField} value={numppl == 0 ? "" : numppl}/>
                        <Box>
                            <ListCompressor type="StyledTextForm" numppl={numppl} handleNames={handleNames}/>
                        </Box>
                        <div style={{display:"flex", justifyContent: "right", marginRight:"18.75%"}}>
                            <StyledButton disabled={numppl <= 0} onClick={() => {setShowCanvas(true);setShowButton(false)}} text="Continue" width="10%"></StyledButton>
                        </div>
                    </Box>
                </CSSTransition>}
            <CSSTransition 
                in={showCanvas} 
                timeout={1000}
                classNames="canvas"
                unmountOnExit
                >
                    <div>
                        {/* <StyledButton onClick={() => {setShowButton(true); setShowCanvas(false)}} text="Back"/> */}
                        {renderCanvas()}
                    </div>
            </CSSTransition>
        </div>
    )

}