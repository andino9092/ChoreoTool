import { height, textAlign } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {Stage, Shape, Layer, Circle} from "react-konva"
import { Button, FormLabel, Drawer, TextField, Box, Divider, Grid} from "@mui/material";
import Person from "./Person";
import { withStyles } from "@mui/styles";
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";
import {styled} from "@mui/material/styles"

const styles = {
    paper: {
      background: "#1E1C1C",
      width: "250px",
    },
  };

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
    const [locations, setLocations] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [rowText, setRow] = useState("");
    const [colText, setCol] = useState("");
    const [title, setTitle] = useState("");

    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = 1000;
    const cHeight = 600;
    const column = cWidth / horizontalSections;
    const row = cHeight / verticalSections;

    // Have a scale version that opens a page that allows you to see everything
    // Musix Match for lyrics
    // Find fix for not beign able to close after clicking backdrop
    // Stage Front label
    // Add error handling for text fields
    // Add await and async functions to Login button

    const renderPeople = () => {
        console.log(locations[0]);
        return locations.map((n, index) => 
            <Person key={index} x={n[0]} y={n[1]}></Person>
        )
    }

    const people = renderPeople();

    const addPerson = async (e) => {
        e.preventDefault();
        const x = colText ? colText * column: 500;
        const y = rowText ? (verticalSections - rowText) * row : 300;
        const arr = [x, y];
        console.log(arr);
        const wait = await waitLocations(arr);
        setPeople(numPeople + 1);
        console.log(locations);
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

    const convertData = () => {
        console.log(locations);
    }

    const waitLocations = async (arr) => {
        const wait = setLocations(locations => [...locations, arr]);
    }

    const handleDrawer = () => {
        toggleDrawer(!drawerOpen);
        console.log(!drawerOpen);
    }

    const checkInput = (text) => {

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
                    <Stage width={cWidth} height ={cHeight}>
                        <Layer>
                            <Shape sceneFunc={(context, shape) => {
                                context.beginPath();
                                context.moveTo(0, 0);
                                context.lineTo(1000, 0);
                                context.lineTo(1000, 1000);
                                context.lineTo(0, 1000);
                                context.lineTo(0, 0);
                                context.closePath();
                                context.fillStrokeShape(shape);
                            }}
                            fill="#2e2c2c"
                            />
                            <Shape sceneFunc={(context, shape) => {
                                context.beginPath();
                                for (var i = 0; i <= 8; i++){
                                    context.moveTo(cWidth / horizontalSections * i, 0);
                                    context.lineTo(cWidth/ horizontalSections * i, cHeight);
                                    context.stroke();
                                }
                                for (var i = 0; i <= 5; i++){
                                    context.moveTo(0, cHeight/ verticalSections * i);
                                    context.lineTo(cWidth, cHeight/ verticalSections * i);
                                    context.stroke();
                                }
                                context.closePath();
                                context.moveTo(0, 0);
                                
                                context.fillStrokeShape(shape);
                            }}
                            />
                        </Layer>
                        <Layer>
                            {people}
                        </Layer>
                    </Stage>
                </div>
                <Box sx={{my:3, mx: 2}}>
                    <StyledButton onClick={handleDrawer} width="5%" display="block" margin="0 auto" text="Tools"/>
                    {/* <Button onClick={handleDrawer} style={{backgroundColor:"green", color:"black", display:"block", margin:"0 auto"}}>
                        Tools
                    </Button> */}
                </Box>
                <Drawer
                    sx={{
                        width: 240,
                        backgroundColor: "black",
                        color: "black"
                    }}
                    classes={
                        {paper: classes.paper}
                    }
                    style={{backgroundColor:"black"}}
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
                    
                    
                </Drawer>
            </form>
        </div>
    )
}

export default withStyles(styles)(Canvas);