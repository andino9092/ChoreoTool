import React, { useEffect } from "react"
import { useState, forwardRef} from "react";
import { Stage, Shape, Layer } from "react-konva";
import Person from "./Person";

export default function FormationPage(props){

    const [currLocation, setCurrLocation] = useState(props.locations[1]);
    const [prevLocation, setPrevLocation] = useState(props.locations[0]);
    const [nextLocation, setNextLocation] = useState(props.locations[2]);
    const [people, setPeople] = useState();

    const references = Array(props.locations.length).fill(0).map(() => React.createRef());

    useEffect(() => {
        setCurrLocation(props.locations[1]);
        setNextLocation(props.locations[2]);
        setPrevLocation(props.locations[0]);
    })

    useEffect(() => {
        setPeople(renderPeople());
    }, [currLocation]);


    const renderPeople = () => {
        return currLocation.map((n, index) => {
            const prevX = prevLocation[index] ? prevLocation[index][0] : null;
            const prevY = prevLocation[index] ? prevLocation[index][1] : null;
            const nextX = nextLocation[index] ? nextLocation[index][0] : null;
            const nextY = nextLocation[index] ? nextLocation[index][1] : null;
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