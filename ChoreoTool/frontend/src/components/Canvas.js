import { height, textAlign } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {Stage, Shape, Layer, Circle} from "react-konva"
import { Button, FormLabel, Drawer, TextField, Box, Divider, Grid} from "@mui/material";
import Person from "./Person";
import { withStyles } from "@mui/styles";
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import FormationPage from "./FormationPage";
import {styled} from "@mui/material/styles"

const StyledDrawer = styled(Drawer)(({
    '&.MuiDrawer-docked':{
        backgroundColor: "#1E1C1C",
        '& .MuiDrawer-paperAnchorDockedRight':{
            backgroundColor: "#1E1C1C",
            width: "225px",
        },
    }
}))

const TitleStyle = styled(TextField)(({
    
    '& label.Mui-focused':{
        color: "white",
    },

    '& label':{
        color: "white",
    },

    '& .MuiInputBase-formControl':{

        borderBottom: "None",

        
        '& .MuiInputBase-input': {
            color: "white",
            textAlign: "center",
            fontSize: "40px",
            letterSpacing: "4px",
        },
        '&::before':{
            borderBottom: "None",
        },
        '&::after':{
            borderBottom: "white solid 2px",
        }
      

    },
    '&.MuiTextField-root':{
        display: "block",
        alignItems: "center",
        textAlign: "center",
    }
}))

function Canvas(props){

    const {classes} = props;

    const [numPeople, setPeople] = useState(0);
    const [pages, setPages] = useState(0);
    const [locations, setLocations] = useState([]); // Current slide locations
    // If need th others, use all data
    const [pieceLocations, setPieceLocations] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [rowText, setRow] = useState("");
    const [colText, setCol] = useState("");
    const [title, setTitle] = useState("");
    const [currSlide, setCurrentSlide] = useState(0);
    const [numSlides, setNumSlides] = useState(1);

    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = window.innerWidth/1.5;
    const cHeight = window.innerHeight/1.5;
    const column = cWidth / horizontalSections;
    const row = cHeight / verticalSections;

    // Have a scale version that opens a page that allows you to see everything
    // Musix Match for lyrics
    // Find fix for not beign able to close after clicking backdrop
    // Stage Front label
    // Add error handling for text fields
    // Add await and async functions to Login button
    // Have no internet state
    // Check to see if drawer doesnt close outside click because its in Canvas rather than CreateFormationSlide
    // Choosing slide 

    const addPerson = async (e) => {
        e.preventDefault();
        const x = colText ? colText * column: 500;
        const y = rowText ? (verticalSections - rowText) * row : 300;
        const arr = [x, y];
        const wait = await waitLocations(arr);
        setPeople(numPeople + 1);
    }

    const handleTextField = (e) => {
        console.log(e.target.name);
        if (e.target.name == "y"){
            setRow(e.target.value);
        }
        else if (e.target.name == "title"){
            setTitle(e.target.value);
        }
        else{
            setCol(e.target.value);
        }
    }

    // error handler, if it is empty don't save
    // This is only for 1 formation page
    const convertData = () => {
        var locs = locations.map((n) => "[" + n[0] + "," + n[1] + "]");
        console.log(locs);
    }

    const waitLocations = async (arr) => {
        const wait = setLocations(locations => [...locations, arr]);
        console.log(locations);
    }

    // Creating new slide
    const addFormations = async () => {
        setPieceLocations(pieceLocations => [...pieceLocations.map, locations]);
        setLocations([]);
        setCurrentSlide(currSlide+1);
        setNumSlides(numSlides+1);
    }

    // One for choosing slide

    const handleDrawer = () => {
        toggleDrawer(!drawerOpen);
        console.log(!drawerOpen);
    }

    return (
        <div>
            
            <Box sx={{my: 2, mx: 2}}>
                <div style={{display:"flex", justifyContent: "right", marginRight:"10%"}}>
                    <StyledButton onClick={convertData} text="Save" width="10%"></StyledButton>
                </div>
            </Box>
            <form>
                <Box sx={{my: 2, mx: 1, alignItems:"center", justifyContent:"center"}}>
                    <TitleStyle variant="standard" name="title" placeholder="Title" value={title} onChange={handleTextField}></TitleStyle>
                </Box>
                <div style={{display:"block", margin:"0 auto"}}>
                    {console.log(locations)}
                    <FormationPage 
                        cWidth={cWidth} 
                        cHeight={cHeight}
                        locations={locations}
                        horizontalSections={horizontalSections}
                        verticalSections={verticalSections}
                        />
                </div>
                <Box sx={{my:3, mx: 2}}>
                    <StyledButton onClick={handleDrawer} width="5%" display="block" margin="0 auto" text="Tools"/>
                    {/* <Button onClick={handleDrawer} style={{backgroundColor:"green", color:"black", display:"block", margin:"0 auto"}}>
                        Tools
                    </Button> */}
                </Box>
                <StyledDrawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawer}
                    onOpen={handleDrawer}
                    variant="persistent">
                    <Box>
                        <Box sx={{height:"50px"}}>
                            <h1 style={{color:"white", display:"block", margin:"0 auto", textAlign:"center",}}>Tools</h1>
                        </Box>
                        <Divider textAlign="center" sx={{height:"10px", fontSize:"10px", color:"white"}}>CREATE MARKER</Divider>
                        <Box sx={{height:"150px"}}>   
                                <Box sx={{my: 2, mx: 1, alignItems:"center"}}>
                                    <Grid container direction={"row"} alignItems="center" justifyContent="center">
                                        <StyledText value={rowText} onChange={handleTextField} name="y" label="Row" width="75px" height="50px" padding="2px"/>
                                        <StyledText value={colText} onChange={handleTextField} name="x" label="Col" width="75px" height="50px" padding="2px"/>
                                    </Grid>  
                                </Box>
                                <Grid container direction={"center"} alignItems="center" justifyContent="center">
                                        <StyledButton text="Create Person" onClick={addPerson} style={{ display:"block", margin:"0 auto"}}/>
                                </Grid>
                        </Box>
                        <Box>
                            <StyledButton text="Close" onClick={handleDrawer} width="50%" display="block" margin="0 auto"/>
                        </Box>
                    </Box>
                </StyledDrawer>
            </form>
        </div>
    )
}

export default Canvas;