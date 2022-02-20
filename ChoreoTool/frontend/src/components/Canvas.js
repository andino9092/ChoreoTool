import { height } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import {Stage, Shape, Layer, Circle} from "react-konva"
import { SwipeableDrawer } from "@mui/material";
import Person from "./Person";

export default function Canvas(props){



    const verticalSections = 5;
    const horizontalSections = 8;
    const cWidth = 1000;
    const cHeight = 600;
    
    // Have a scale version that opens a page that allows you to see everything
    

    const renderPeople = () => {
        console.log("rendered");
        return [...Array(2)].map((n) => 
            <Person></Person>

            )
    }



    const people = renderPeople();

    return (
        <div>
            <h1 style={{display: "block", margin:"0 auto", textAlign:"center"}}>Title</h1>
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
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                // open={open}
                // onClose={toggleDrawer(false)}
                // onOpen={toggleDrawer(true)}
                // swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}>

            </SwipeableDrawer>
        </div>
    )
}