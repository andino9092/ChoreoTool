import React from "react"
import { useState } from "react";
import { Stage, Shape, Layer } from "react-konva";
import Person from "./Person";

export default function FormationPage(props){

    const renderPeople = () => {
        console.log(props.locations);
        return props.locations.map((n, index) => 
            <Person key={index} x={n[0]} y={n[1]}></Person>
        )
    }

    const people = renderPeople();

    return (
        <Stage width={props.cWidth} height ={props.cHeight}>
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
                        context.moveTo(props.cWidth / props.horizontalSections * i, 0);
                        context.lineTo(props.cWidth/ props.horizontalSections * i, props.cHeight);
                        context.stroke();
                    }
                    for (var i = 0; i <= 5; i++){
                        context.moveTo(0, props.cHeight/ props.verticalSections * i);
                        context.lineTo(props.cWidth, props.cHeight/ props.verticalSections * i);
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
    )
}