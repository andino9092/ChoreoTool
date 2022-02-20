import React, {useState, useEffect} from "react";
import { Circle } from "react-konva";

export default function Person(props){
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);


    return(
        <Circle x={x} y={y}>

        </Circle>
    )
}