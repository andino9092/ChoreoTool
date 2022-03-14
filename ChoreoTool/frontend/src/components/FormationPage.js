import { Button } from "@mui/material";
import React, { useEffect, useImperativeHandle, createRef } from "react"
import { useState, forwardRef, useRef} from "react";
import { Stage, Shape, Layer } from "react-konva";
import Person from "./Person";

const FormationPage = forwardRef((props, ref) => {

    const [currLocation, setCurrLocation] = useState(props.locations[1]);
    const [prevLocation, setPrevLocation] = useState(props.locations[0]);
    const [nextLocation, setNextLocation] = useState(props.locations[2]);
    const [people, setPeople] = useState();
    const [references, setReferences] = useState();

    useEffect(() => {
        console.log(props.locations[0]);
        setCurrLocation(props.locations[1]);
        setNextLocation(props.locations[2]);
        setPrevLocation(props.locations[0]);
    })

    useEffect(() => {
        console.log(prevLocation);
    }, [prevLocation])


    useEffect(() => {
        setPeople(renderPeople());
    }, [currLocation, prevLocation, nextLocation]);


    const handleClick = () => {
        for (var i = 0; i < references.length; i++){
            console.log(references[i]);
            // references[i].current.goLast();
        }
    }

    const renderPeople = () => {
        return currLocation.map((n, index) => {
            const prevX = prevLocation[index] ? prevLocation[index][0] : null;
            const prevY = prevLocation[index] ? prevLocation[index][1] : null;
            const nextX = nextLocation[index] ? nextLocation[index][0] : null;
            const nextY = nextLocation[index] ? nextLocation[index][1] : null;
            setReferences(Array(props.locations[1].length).fill(0).map(() => createRef()))
            return <Person 
                        ref={references[index]}
                        onDrag={props.onDrag} 
                        id={index} 
                        x={n[0]} 
                        y={n[1]}
                        prevX={prevX}
                        prevY={prevY}
                        nextX={nextX}
                        nextY={nextY}
                    ></Person>}

        )
    }



    return (
        <div>
        <Button onClick={handleClick}>HERE</Button>
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