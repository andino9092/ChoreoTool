import React, { useEffect} from "react"
import { useState, forwardRef} from "react";
import { Stage, Shape, Layer, Text} from "react-konva";
import Person from "./Person";

const FormationPage = forwardRef((props, ref) => {

    const [currLocation, setCurrLocation] = useState(props.locations);
    const [people, setPeople] = useState();

    const references = ref

    useEffect(() => {
        setCurrLocation(props.locations);
    })

    useEffect(() => {
        if (currLocation){
            setPeople(renderPeople());
        }
    }, [currLocation]);

    const renderPeople = () => {
        return currLocation.map((n, index) => {
            const res = <Person 
                        name={props.names[index]}
                        draggable={true}
                        hovering={true}
                        ref={references.current[index]}
                        onDrag={props.onDrag} 
                        id={index} 
                        key={index}
                        x={n[0]} 
                        y={n[1]}
                        size={10}
                    />
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
                    context.lineTo(props.cWidth, 0);
                    context.lineTo(props.cWidth, props.cHeight);
                    context.lineTo(0, props.cHeight);
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