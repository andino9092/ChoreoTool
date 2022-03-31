import React, { useEffect, useState } from "react";
import { Stage, Shape, Layer} from "react-konva";
import Person from "./Person";
import convertToData from "./ConvertToData";

export default function Preview(props){

    const [people, setPeople] = useState();
    const [currFormations, setCurrFormations] = useState();

    useEffect(() => {
        setPeople(renderPeople());
    }, [props.formations]);

    // this only works if 1 slide from props.formations

    const renderPeople = () => {
        return convertData(props.formations).map((n, index) => {
            return <Person
                        id={index}
                        x={n[0]/3}
                        y={n[1]/1.85}
                        size={10}
                    />
        })
    }

    return(
        <div>
            <Stage width={400} height={325}>
                <Layer>
                    <Shape sceneFunc={(context, shape) => {
                        context.beginPath();
                        context.moveTo(0,0);
                        context.lineTo(500,0);
                        context.lineTo(500,500);
                        context.lineTo(0, 500);
                        context.lineTo(0,0);
                        context.closePath();
                        context.fillStrokeShape(shape);
                    }}
                    fill="#2e2c2c"
                    />
                </Layer>
                <Layer>
                    {people}
                </Layer>
            </Stage>

        </div>
    )
}