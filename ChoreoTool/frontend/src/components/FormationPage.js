import { Button } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useImperativeHandle, createRef } from "react"
import { useState, forwardRef, useRef} from "react";
import { Stage, Shape, Layer } from "react-konva";
import Person from "./Person";

const FormationPage = forwardRef((props, ref) => {

    const [currLocation, setCurrLocation] = useState(props.locations);
    const [people, setPeople] = useState();
    const references = ref

    useEffect(() => {
        setCurrLocation(props.locations);
    })


    useEffect(() => {
        setPeople(renderPeople());
    }, [currLocation]);


    const handleClick = () => {
        console.log(references.current);
        for (var i = 0; i < references.current.length; i++){
            references.current[i].to({
                y: prevY,
                x: prevX,
            })
        }
    }

    const renderPeople = () => {
        return currLocation.map((n, index) => {
            const res = <Person 
                        ref={references.current[index]}
                        onDrag={props.onDrag} 
                        id={index} 
                        x={n[0]} 
                        y={n[1]}
                    ></Person>
            return res;    
            }

        )
    }



    return (
        <div>
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
        </div>
    )
})

export default FormationPage;