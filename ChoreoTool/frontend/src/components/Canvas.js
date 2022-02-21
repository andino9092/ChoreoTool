import { height } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {Stage, Shape, Layer, Circle} from "react-konva"
import { Button, FormLabel, Drawer, TextField, Box, Divider, Grid} from "@mui/material";
import Person from "./Person";
import { withStyles } from "@mui/styles";
import Test from "./Testing";

const styles = {
    paper: {
      background: "#1E1C1C",
      width: "250px",
    },
    input: {
        color: "white",
    },
    root: {
        '&$disabled $notchedOutline':{
            borderColor: "white",
        }
    },
    disabled: {},
    notchedOutline: {},
    cssBorder: {
        borderColor: "white",
    }
    
  };

function Canvas(props){

    const {classes} = props;

    const [numPeople, setPeople] = useState(0);
    const [locations, setLocations] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);

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

    const renderPeople = () => {
        console.log(locations[0]);
        return locations.map((n, index) => 
            <Person key={index} x={n[0]} y={n[1]}></Person>
        )
    }

    const people = renderPeople();

    const addPerson = async (e) => {
        e.preventDefault();
        const x = e.target.x.value ? e.target.x.value * column: 500;
        const y = e.target.y.value ? (verticalSections - e.target.y.value) * row : 300;
        const arr = [x, y];
        console.log(arr);
        const wait = await waitLocations(arr);
        setPeople(numPeople + 1);
        console.log(locations);
    }

    const waitLocations = async (arr) => {
        const wait = setLocations(locations => [...locations, arr]);
    }

    const handleDrawer = () => {
        toggleDrawer(!drawerOpen);
        console.log(!drawerOpen);
    }

    return (
        <div>
            <Test x="x"></Test>
            <h1 style={{display: "block", margin:"0 auto", textAlign:"center", paddingBottom:"10px"}}>Title</h1>
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
                <Button onClick={handleDrawer} style={{backgroundColor:"green", color:"black", display:"block", margin:"0 auto"}}>
                    Tools
                </Button>
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
                        <form onSubmit={addPerson}>    
                            <Box sx={{my: 2, mx: 1, alignItems:"center"}}>
                                <Grid container direction={"row"} alignItems="center" justifyContent="center">
                                    <TextField 
                                        InputProps={{
                                            classes:{
                                                root: classes.input,
                                                notchedOutline: classes.cssBorder,
                                                focused: classes.cssBorder,
                                                disabled: classes.cssBorder,
                                            },
                                        }}
                                        InputLabelProps={{
                                            classes:{
                                                root: classes.input,
                                                notchedOutline: classes.cssBorder,
                                                focused: classes.cssBorder,
                                                disabled: classes.cssBorder,
                                            },
                                            className: classes.input,
                                        }}
                                        name="y" label="Row" sx={{color:"green", width:"75px", height:"50px", padding:"2px"}}/>
                                    <TextField 
                                        sx={{
                                            '& MuiInputBase-input': {
                                                borderColor: "white",
                                            }

                                        }}
                                        
                                         name="x" label="Col" sx={{width:"75px", height:"50px", padding:"2px"}}/>
                                    
                                </Grid>  
                            </Box>
                            <Grid container direction={"center"} alignItems="center" justifyContent="center">
                                    <Button type="submit">
                                        Create Person
                                    </Button>
                                </Grid>
                        </form>
                    </Box>
                    <Box>
                        <Button onClick={handleDrawer}>
                            Close
                        </Button>
                    </Box>
                </Box>
                
                
            </Drawer>
        </div>
    )
}

export default withStyles(styles)(Canvas);